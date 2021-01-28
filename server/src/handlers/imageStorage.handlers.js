const mongoose = require("mongoose");
const multer = require("multer");
const mongodb = require("mongodb");
const GridFsStorage = require("multer-gridfs-storage");
const { ErrorHandler } = require("../helpers/error.helper")

let bucket;
let storage;

//gets a random string for making filename unique
const randomString = [...Array(6)]
  .map((i) => (~~(Math.random() * 36)).toString(36))
  .join("");

//Name of bucket for images at MongoDb
const BUCKET = "image";

//Opens connection to mongoDB and the image collection-bucket
mongoose.connection.once("open", () => {
  db = mongoose.connection.db;
  bucket = new mongodb.GridFSBucket(db, {
    bucketName: BUCKET,
  });
  storage = new GridFsStorage({
    db: db,
    file: (req, file) => {
      //Checks if the image is of correct mimetype
      const match = ["image/png", "image/jpeg", "image/gif"];
      if (match.indexOf(file.mimetype) === -1) {
        return null;
      }
      return {
        bucketName: BUCKET,
        filename: `${randomString}-${file.originalname}`,
      };
    },
  });
  storage.on("connection", () => {
    console.log("Connected to the image collection");
  });
  storage.on("connectionFailed", (err) => {
    console.error("Connection to image collection failed", err);
  });
});

//Saves single image to bucket
const writeSingleImage = (req, res, next) => {
  const upload = multer({ 
    storage,
    //Will be able to take larger images when de delete unused image function is done.
    limits: { fileSize: 500 * 1000 }
    }).single("image");
  upload(req, res, (error) => {
    try {
      if (error) next(error)
      if (!req.file.id) throw new ErrorHandler(500, "Bilden är för stor")
      res.id = req.file.id;
      next();
    } catch (error) {
      next(error)
    }
  });
};

//Gets single image from bucket
const readSingleImage = async (req, res, next) => {
  try {
    const filter = mongoose.Types.ObjectId(req.params.id);
    if(!filter) throw new ErrorHandler()
    const { contentType } = await bucket
      .find(filter)
      .next();
    const readStream = bucket.openDownloadStream(filter);

    readStream.on("error", (error) => {
      next(error)
    });

    readStream.on("data", (chunk) => {
      res.write(chunk)
    });

    readStream.on("end", () => {
      res.contentType = contentType
      next();
    });
  } catch (error) {
    next(error)
  }
};

//deletes image in bucket
const deleteSingleImage = (req, res, next) => {
  try {
    if(!req.params.id) throw new ErrorHandler(400, "No image ID was submitted")
    const id = mongoose.Types.ObjectId(req.params.id);
    bucket.delete(id, (error) => {
      if (error) {
        next(error)
      } else {
        next();
      }
    });
  } catch (error) {
    next(error)
  }
};

module.exports = {
  deleteSingleImage,
  readSingleImage,
  writeSingleImage,
};