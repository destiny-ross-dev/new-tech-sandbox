require("dotenv").config();
const express = require("express");
const { json } = require("body-parser");
const cors = require("cors");
const port = 3010;
const c = require("./controller");

const app = express();

app.use(json());
app.use(cors());

app.get("/request", c.getRequest);

app.listen(port, () => console.log(`Listening on port ${port}`));
