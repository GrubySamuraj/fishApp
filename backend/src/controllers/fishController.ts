import { Request, Response } from "express";
import { getFishes } from "../models/fishModel";

export const getFishesController = async (req: Request, res: Response) => {
  try {
    const fishes = await getFishes();
    res.json(fishes);
  } catch (error: any) {
    res.status(500).json({ message: "Błąd serwera", error: error.message });
  }
};
