import express from "express";
import fishRoutes from "./routes/fishRoutes";
import postRoutes from "./routes/postRoutes";
import * as dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/fish", fishRoutes);
app.use("/api/posts", postRoutes);
app.use("/uploads", express.static("uploads"));

app.listen(PORT, () => {
  console.log(`Serwer działa na porcie ${PORT}`);
});
