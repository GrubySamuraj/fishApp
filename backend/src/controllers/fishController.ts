import { Request, Response } from "express";
import { addFish, getFishes } from "../models/fishModel";
import pool from "../database/db";
import path from "path";
import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../uploads"));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `fish_${uniqueSuffix}${path.extname(file.originalname)}`);
  },
});

export const upload = multer({ storage });

export const getFishesController = async (req: Request, res: Response) => {
  try {
    const fishes = await getFishes();
    res.json(fishes);
  } catch (error: any) {
    res.status(500).json({ message: "Błąd serwera", error: error.message });
  }
};

export const addFishController = async (req: Request, res: Response) => {
  try {
    const {
      name,
      wymiarOchronny,
      okresRozpoczeciaOchrony,
      okresZakonczeniaOchrony,
    } = JSON.parse(req.body.data);

    if (!req.file) {
      res.status(400).json({ message: "Brak pliku w żądaniu" });
    }

    const filename = req.file?.filename || name;
    const result = await addFish(
      filename,
      name,
      wymiarOchronny,
      okresRozpoczeciaOchrony,
      okresZakonczeniaOchrony
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
