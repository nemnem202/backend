import express from "express";
import { CloudinaryClient } from "./CloudinaryClient";

const app = express();
const port = 3000;

app.get("/", (_req, res) => {
  res.send("Hello depuis TSX 👋");
});

app.listen(port, () => {
  console.log(`Serveur en écoute sur http://localhost:${port}`);
});
