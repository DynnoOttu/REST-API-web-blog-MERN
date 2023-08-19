const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongose = require("mongoose");
const multer = require("multer");
const path = require("path");

const authRoutes = require("./src/routes/auth");
const blogRoutes = require("./src/routes/blog");

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now().toString() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use("/images", express.static(path.join(__dirname, "images")));
app.use(bodyParser.json()); //akan menerima type JSON
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-type, Authorization");
  next();
});

app.use("/v1/auth/", authRoutes);
app.use("/v1/blog/", blogRoutes);

app.use((error, req, res, next) => {
  const status = error.errorStatus || 500;
  const message = error.message;
  const data = error.data;

  res.status(status).json({ message: message, data: data });
});

mongose
  .connect(
    "mongodb://dynnoottu968:Pk29KvojjaWfkgS3@ac-rqpw0g6-shard-00-00.qxklg6a.mongodb.net:27017,ac-rqpw0g6-shard-00-01.qxklg6a.mongodb.net:27017,ac-rqpw0g6-shard-00-02.qxklg6a.mongodb.net:27017/?ssl=true&replicaSet=atlas-t9kx1u-shard-0&authSource=admin&retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(4000, () => console.log("conection success"));
  })
  .catch((err) => console.log(err));
