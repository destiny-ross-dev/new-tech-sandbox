const express = require("express");

const port = 5200;

const app = express();

app.use("*", (req, res, next) => {
  res.send({ data: "Hear me Roar" });
});

app.listen(port, () => {
  console.log(`Rest api on http://localhost:${port}`);
});
