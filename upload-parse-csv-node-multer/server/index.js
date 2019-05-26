const express = require("express");
const morgan = require("morgan-body");
const multer = require("multer");
const cors = require("cors");

const port = 5200;

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "public");
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});
var upload = multer({ storage: storage }).single("file");

const app = express();
app.use(cors());
morgan(app);

app.post("/upload", function(req, res) {
  upload(req, res, function(err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).send(req.file);
  });
});

app.use("*", (req, res, next) => {
  res.send({ data: "Hear me Roar" });
});

app.listen(port, () => {
  console.log(`Rest api on http://localhost:${port}`);
});
