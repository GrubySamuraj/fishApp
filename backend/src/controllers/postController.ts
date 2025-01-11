import { Request, Response } from "express";
import { addPost, getPosts } from "../models/postModel";
import path from "path";
import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../uploads"));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `file_${uniqueSuffix}${path.extname(file.originalname)}`);
  },
});
export const upload = multer({ storage });
export const getPostsController = async (req: Request, res: Response) => {
  try {
    const posts = await getPosts();
    res.json(posts);
  } catch (error: any) {
    res.status(500).json({ message: "Błąd serwera", error: error.message });
  }
};
export const addPostController = async (req: Request, res: Response) => {
  try {
    const { fish, description, lng, lat, username, title } = JSON.parse(
      req.body.data
    );

    if (!req.file) {
      res.status(400).json({ message: "Brak pliku w żądaniu" });
    }

    const photoPath = req.file?.filename || name;
    const result = await addPost(
      fish,
      description,
      lng,
      lat,
      username,
      photoPath as string,
      title
    );

    res.status(201).json({
      message: "Ryba została dodana",
      fish: result.rows[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Błąd podczas dodawania ryby" });
  }
};
