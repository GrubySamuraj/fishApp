import { Router } from "express";
import {
  addPostController,
  getPostsController,
} from "../controllers/postController";
import { upload } from "../controllers/postController";

const router = Router();

router.get("/getPosts", getPostsController);
router.post("/sendPost", upload.single("file"), addPostController);

export default router;
