import { Router } from "express";
import { siteController } from "../controllers/siteController";

const router = Router();

router.get("/contact", siteController);

export default router;
