const multer = require("multer");
const path = require("path");
const helper = require("../helper/response");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname
    );
  },
});

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname);
  //   console.log(ext);
  if (ext !== ".png" && ext !== ".jpg" && ext !== ".jpeg") {
    return cb(new Error("Only Images (PNG, JPG, JPEG) are allowed !!!"), false);
  } else {
    cb(null, true);
  }
};

const maxSize = 1 * 1024 * 1024;
const uploads = multer({
  storage,
  fileFilter,
  limits: { fileSize: maxSize },
}).single("imgRecruiter");

const uploadsFilter = (req, res, next) => {
  uploads(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return helper.response(res, err.message, 400, "Error Uploading File");
    } else if (err) {
      return helper.response(res, err.message, 400, "Error Uploading File");
    }
    next();
  });
};

module.exports = uploadsFilter;
