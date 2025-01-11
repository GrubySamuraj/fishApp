import { Request, Response } from "express";
import { getPosts } from "../models/postModel";

export const getPostsController = async (req: Request, res: Response) => {
  try {
    const posts = await getPosts();
    res.json(posts);
  } catch (error: any) {
    res.status(500).json({ message: "Błąd serwera", error: error.message });
  }
};
