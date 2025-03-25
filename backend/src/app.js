const express = require("express");
const cors = require("cors");

const router = require("./modules/index.module");

const app = express();
const PORT = 5555;

app.use(cors());
app.use(express.json());
app.use(router);

app.listen(PORT, () => {
  console.log(`Server started to listen at port ${PORT}...`);
});
