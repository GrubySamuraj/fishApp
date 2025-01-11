import { Router } from "express";
import {
  addFishController,
  getFishesController,
  upload,
} from "../controllers/fishController";

const router = Router();

router.get("/getFishes", getFishesController);
router.post("/addFishes", upload.single("file"), addFishController);

export default router;
