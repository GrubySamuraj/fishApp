import multer, { Multer } from "multer";
import path from "path";
import { Request } from "express";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

export class FilesHandler {
  public static upload: Multer = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
      const filetypes = /jpeg|jpg|png/;
      const mimetype = filetypes.test(file.mimetype);
      const extname = filetypes.test(
        path.extname(file.originalname).toLowerCase()
      );

      if (mimetype && extname) {
        return cb(null, true);
      }
      cb(new Error("Tylko pliki obrazów są dozwolone!"));
    },
  });
  public static async saveFileToDB(file: Express.Multer.File, body: string) {
    console.log(body);
  }
}
