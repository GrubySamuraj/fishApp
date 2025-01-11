import { Router } from "express";
import { getFishesController } from "../controllers/fishController";

const router = Router();

router.get("/getFishes", getFishesController);

export default router;
