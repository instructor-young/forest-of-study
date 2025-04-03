const express = require("express");
const bcrypt = require("bcrypt");
const {
  startOfToday,
  endOfToday,
  startOfWeek,
  endOfWeek,
} = require("date-fns");
const prisma = require("../db/prisma/client.prisma");
const studyOwnerOnly = require("../middlewares/studyOwnerOnly");

const studiesRouter = express.Router();

/**
 * 스터디 생성
 */
studiesRouter.post("/", async (req, res, next) => {
  try {
    const { ownerName, name, description, background, password } = req.body;
    const encryptedPassword = await bcrypt.hash(password, 12);
    if (!ownerName || !name || !description || !background || !password)
      throw new Error("Invalid input");

    const study = await prisma.study.create({
      data: { ownerName, name, description, background, encryptedPassword },
    });

    res.status(201).json(study);
  } catch (e) {
    next(e);
  }
});

/**
 * 전체 스터디 조회
 */
studiesRouter.get("/", async (req, res, next) => {
  try {
    const studies = await prisma.study.findMany({
      orderBy: { createdAt: "desc" },
      omit: { encryptedPassword: true },
    });

    res.status(200).json(studies);
  } catch (e) {
    next(e);
  }
});

/**
 * 스터디 상세 조회
 */
studiesRouter.get("/:studyId", async (req, res, next) => {
  try {
    const studyId = req.params.studyId;
    const weekStart = startOfWeek(new Date());
    const weekEnd = endOfWeek(new Date());

    const study = await prisma.study.findUnique({
      where: { id: studyId },
      omit: { encryptedPassword: true },
      include: {
        habits: {
          orderBy: { createdAt: "asc" },
          include: {
            habitRecords: {
              where: { recordedAt: { gte: weekStart, lte: weekEnd } },
            },
          },
        },
      },
    });

    const filteredHabits = study.habits.filter(
      (habit) => habit.isDeleted === false || habit.habitRecords.length > 0
    );
    study.habits = filteredHabits;

    res.status(200).json(study);
  } catch (e) {
    next(e);
  }
});

/**
 * 스터디 비밀번호 검증
 */
studiesRouter.post("/:studyId/check-password", async (req, res, next) => {
  try {
    const studyId = req.params.studyId;
    const { password } = req.body;
    const study = await prisma.study.findUnique({
      where: { id: studyId },
    });
    const isCorrect = await bcrypt.compare(
      password || "",
      study.encryptedPassword
    );

    res.status(200).json(isCorrect);
  } catch (e) {
    next(e);
  }
});

/**
 * 스터디 수정
 */
studiesRouter.put("/:studyId", studyOwnerOnly, async (req, res, next) => {
  try {
    const studyId = req.params.studyId;
    const { ownerName, name, description, background, newPassword } = req.body;
    if (!ownerName || !name || !description || !background)
      throw new Error("Invalid input");

    const encryptedPassword = newPassword
      ? await bcrypt.hash(newPassword, 12)
      : undefined;

    const study = await prisma.study.update({
      where: { id: studyId },
      data: { ownerName, name, description, background, encryptedPassword },
      omit: { encryptedPassword: true },
    });

    res.status(201).json(study);
  } catch (e) {
    next(e);
  }
});

/**
 * 스터디 삭제
 */
studiesRouter.delete("/:studyId", studyOwnerOnly, async (req, res, next) => {
  try {
    const studyId = req.params.studyId;
    await prisma.study.delete({ where: { id: studyId } });

    res.status(204).send();
  } catch (e) {
    next(e);
  }
});

/**
 * 스터디 습관 목록 가져오기
 */
studiesRouter.get(
  "/:studyId/habits",
  studyOwnerOnly,
  async (req, res, next) => {
    try {
      const studyId = req.params.studyId;

      const todayStart = startOfToday();
      const todayEnd = endOfToday();

      const study = await prisma.study.findUnique({
        where: { id: studyId },
        omit: { encryptedPassword: true },
        include: {
          habits: {
            include: {
              habitRecords: {
                where: {
                  recordedAt: {
                    gte: todayStart,
                    lte: todayEnd,
                  },
                },
              },
            },
            where: { AND: [{ isDeleted: false }] },
            orderBy: { createdAt: "asc" },
          },
        },
      });

      res.json(study);
    } catch (e) {
      next(e);
    }
  }
);

/**
 * 스터디 습관 목록 업데이트
 */
studiesRouter.put(
  "/:studyId/habits",
  studyOwnerOnly,
  async (req, res, next) => {
    try {
      prisma.$transaction(async (tx) => {
        const studyId = req.params.studyId;
        const habits = req.body;

        const existingHabits = await prisma.habit.findMany({
          where: { studyId, isDeleted: false },
        });

        const habitsToDelete = existingHabits.filter(
          (existingHabit) =>
            !habits.some((habit) => habit.id === existingHabit.id)
        );

        const habitsToCreate = habits.filter((habit) =>
          habit.id.includes("new-")
        );

        const habitsToUpdate = habits.filter(
          (habit) => !habit.id.includes("new-")
        );

        const promisesA = habitsToDelete.map((habit) =>
          tx.habit.update({
            where: { id: habit.id },
            data: { isDeleted: true },
          })
        );

        const promisesB = habitsToCreate.map((habit) =>
          tx.habit.create({ data: { studyId, title: habit.title } })
        );

        const promisesC = habitsToUpdate.map((habit) =>
          tx.habit.update({
            where: { id: habit.id },
            data: { title: habit.title },
          })
        );

        await Promise.all([...promisesA, ...promisesB, ...promisesC]);

        res.status(200).send("OK");
      });
    } catch (e) {
      next(e);
    }
  }
);

/**
 * 오늘의 습관 달성 여부 토글하기
 */
studiesRouter.put(
  "/:studyId/habits/:habitId",
  studyOwnerOnly,
  async (req, res, next) => {
    try {
      const { studyId, habitId } = req.params;
      const habit = prisma.habit.findUnique({
        where: { id: habitId, studyId },
      });
      if (!habit) throw new Error("Bad Request");

      const todayStart = startOfToday();
      const todayEnd = endOfToday();

      const habitRecord = await prisma.habitRecord.findFirst({
        where: {
          habitId,
          recordedAt: {
            gte: todayStart,
            lte: todayEnd,
          },
        },
      });

      if (habitRecord) {
        await prisma.habitRecord.delete({ where: { id: habitRecord.id } });
        res.status(204).send("No Content");
      } else {
        await prisma.habitRecord.create({ data: { habitId } });
        res.status(201).send("Created");
      }
    } catch (e) {
      next(e);
    }
  }
);

studiesRouter.post(
  "/:studyId/focus",
  studyOwnerOnly,
  async (req, res, next) => {
    try {
      const studyId = req.params.studyId;
      const seconds = req.body.seconds || 0;
      const tenMinutesUnit = Math.floor(seconds / 600);
      const point = 3 + 1 * tenMinutesUnit;

      await prisma.study.update({
        where: { id: studyId },
        data: { point: { increment: point } },
      });

      res.json(point);
    } catch (e) {
      next(e);
    }
  }
);

module.exports = studiesRouter;
