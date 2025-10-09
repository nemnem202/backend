import express from "express";
import router from "../router/router";
import { CloudinaryClient } from "../lib/CloudinaryClient";

const app = express();
const port = 3000;

app.use(router);

app.listen(port, () => {
  console.log(`Serveur en écoute sur http://localhost:${port}`);
});

CloudinaryClient.getInstance().uploadImage("./test-image.png");
