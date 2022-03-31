const multer = require("multer");

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/svg": "svg",
};
console.log("edfrthyjukjhgtfrdfgthjhgf")
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
      callback(null, "images");
    },
    filename: (req, file, callback) => {
      const name = file.originalname.split(" ").join("_");
      console.log("name",name)
      const finalname = name.split(".")[0];
      console.log("finalname",finalname)
      const extension = MIME_TYPES[file.mimetype];
      console.log("extension",extension)
      callback(null, name + Date.now() + "." + extension);
    },
    });
  
  module.exports = multer({ storage: storage }).single("files");