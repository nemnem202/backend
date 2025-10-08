import { Router } from "express";

const account = Router();

account.post("/create", (req, res) => {});
account.post("/login", (req, res) => {});
account.get("/account", (req, res) => {});

export default account;
