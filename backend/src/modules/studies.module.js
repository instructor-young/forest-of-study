const express = require("express");
const bcrypt = require("bcrypt");
const prisma = require("../db/prisma/client.prisma");
const {
  throwErrorIfStudyPasswordIsNotCorrect,
} = require("../utils/functions.utils");

const studiesRouter = express.Router();

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

studiesRouter.get("/:studyId", async (req, res, next) => {
  try {
    const studyId = req.params.studyId;
    const study = await prisma.study.findUnique({
      where: { id: studyId },
      omit: { encryptedPassword: true },
    });

    res.status(200).json(study);
  } catch (e) {
    next(e);
  }
});

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

studiesRouter.put("/:studyId", async (req, res, next) => {
  try {
    const studyId = req.params.studyId;
    const { ownerName, name, description, background, password, newPassword } =
      req.body;
    if (!ownerName || !name || !description || !background || !password)
      throw new Error("Invalid input");

    await throwErrorIfStudyPasswordIsNotCorrect(studyId, password);

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

module.exports = studiesRouter;
