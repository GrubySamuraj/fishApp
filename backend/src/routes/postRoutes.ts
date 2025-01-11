import { Router } from "express";
import { getPostsController } from "../controllers/postController";

const router = Router();

router.get("/getPosts", getPostsController);

export default router;
