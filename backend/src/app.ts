import express from "express";
import { Request, Response } from "express";
import { FilesHandler } from "./models/handleFiles.model";

const app = express();

declare global {
  namespace Express {
    interface Request {
      file?: Express.Multer.File;
    }
  }
}

const PORT = 3000;

app.use(express.json());

app.get("/getFishes", async (req: Request, res: Response) => {
  const fishes = ["szczupak", "karp", "sum"];
  res.json(fishes);
});

app.post(
  "/sendData",
  FilesHandler.upload.single("file"),
  async (req: Request, res: Response) => {
    if (req.file) {
      try {
        await FilesHandler.saveFileToDB(req.file, req.body);
        res.json({
          message: "Plik przesłany i zapisany do bazy danych!",
          filename: req.file.filename,
        });
      } catch (error: any) {
        res.status(500).json({
          message: "Błąd podczas zapisu do bazy danych",
          error: error.message,
        });
      }
    } else {
      res.status(400).send("Nie przesłano pliku!");
    }
  }
);

app.listen(PORT, () => {
  console.log(`Serwer działa na porcie ${PORT}`);
});
