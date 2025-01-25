import express from "express";
import fishRoutes from "./routes/fishRoutes";
import postRoutes from "./routes/postRoutes";
import sitesRouter from "./routes/sitesRouter";

import * as dotenv from "dotenv";
import path from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "pug");
app.set("views", path.join(process.cwd(), "views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/fish", fishRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/sites", sitesRouter);

app.listen(PORT, () => {
  console.log(`Serwer działa na porcie ${PORT}`);
});
