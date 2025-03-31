const {
  throwErrorIfStudyPasswordIsNotCorrect,
} = require("../utils/functions.utils");

function studyOwnerOnly(req, res, next) {
  const { studyId } = req.params;
  const password = req.headers.authorization;

  if (!studyId || !password) throw new Error("Bad request");

  throwErrorIfStudyPasswordIsNotCorrect(studyId, password);

  next();
}

module.exports = studyOwnerOnly;
