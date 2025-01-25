import { Request, Response } from "express";

export const siteController = async (req: Request, res: Response) => {
  try {
    res.render("contact", { title: "Kontakt" });
  } catch (error) {
    console.error("Błąd renderowania widoku:", error);
    res.status(500).send("Wystąpił błąd serwera");
  }
};
