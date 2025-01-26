import { Router } from "express";
import { siteController } from "../controllers/siteController";

const router = Router();

router.get("/about", siteController);

export default router;
