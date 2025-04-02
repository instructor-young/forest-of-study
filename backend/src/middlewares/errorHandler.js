function errorHandler(err, req, res, next) {
  console.log(err);

  res.status(500).send("Some error occured...");
}

module.exports = errorHandler;
