const {
  throwErrorIfStudyPasswordIsNotCorrect,
} = require("../utils/functions.utils");

function studyOwnerOnly(req, res, next) {
  try {
    const { studyId } = req.params;
    const password = req.headers.authorization;

    if (!studyId || !password) throw new Error("Bad request");

    throwErrorIfStudyPasswordIsNotCorrect(studyId, password);

    next();
  } catch (e) {
    next(e);
  }
}

module.exports = studyOwnerOnly;
