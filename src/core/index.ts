import express from "express";
import router from "../router/router";
import cors from "cors";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use(router);

app.listen(port, () => {
  console.log(`Serveur en écoute sur http://localhost:${port}`);
});
