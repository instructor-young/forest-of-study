const express = require("express");
const bcrypt = require("bcrypt");
const prisma = require("../db/prisma/client.prisma");

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
    });

    res.status(200).json(studies);
  } catch (e) {
    next(e);
  }
});

module.exports = studiesRouter;
