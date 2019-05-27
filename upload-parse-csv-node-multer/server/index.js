const express = require("express");
const morgan = require("morgan-body");
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");
const papa = require("papaparse");

const port = 5200;
const publicFolder = "./public/files";

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "public/files");
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});
var upload = multer({ storage: storage }).single("file");

const app = express();
app.use(cors());
app.use(express.static("public"));
// morgan(app);

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

app.get("/files", function(req, res) {
  let fileArray = [];
  fs.readdirSync(publicFolder).forEach(file => {
    fileArray.push(file);
  });

  res.status(200).json(fileArray);
});

app.get("/files/:filename", function(req, res) {
  let { filename } = req.params;
  let csvPath = `${publicFolder}/${filename}.csv`;
  const file = fs.createReadStream(csvPath);
  let data = {};

  papa.parse(file, {
    header: true,
    download: false,
    complete(results) {
      data = { rows: results.data, fields: results.meta.fields };
      res.status(200).json(data);
    }
  });
});
app.use("*", (req, res, next) => {
  res.send({ data: "Hear me Roar" });
});

app.listen(port, () => {
  console.log(`Rest api on http://localhost:${port}`);
});
