const prisma = require("../db/prisma/client.prisma");
const bcrypt = require("bcrypt");

async function throwErrorIfStudyPasswordIsNotCorrect(studyId, password) {
  const study = await prisma.study.findUnique({
    where: { id: studyId },
    select: { encryptedPassword: true },
  });
  if (!study) throw new Error(401);

  const { encryptedPassword } = study;
  const isCorrect = await bcrypt.compare(password, encryptedPassword);

  if (!isCorrect) throw new Error(401);
}

module.exports = {
  throwErrorIfStudyPasswordIsNotCorrect,
};
