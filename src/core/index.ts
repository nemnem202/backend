import express from "express";
import { CloudinaryClient } from "./CloudinaryClient";
import { AccountRepository } from "../repository/account";

const app = express();
const port = 3000;

app.get("/", (_req, res) => {
  res.send("Hello depuis TSX 👋");
});

const test = async () => {
  const repo = new AccountRepository();

  const add = await repo.add_item({
    number_of_reports: 10,
    password: "1234",
    username: "coucou",
  });

  const all = await repo.findAll();

  console.log(all);
};

test();

app.listen(port, () => {
  console.log(`Serveur en écoute sur http://localhost:${port}`);
});
