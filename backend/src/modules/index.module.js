const express = require("express");
const studiesRouter = require("./studies.module");

const router = express.Router();

router.use("/studies", studiesRouter);

module.exports = router;
