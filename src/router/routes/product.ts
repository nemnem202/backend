import { Router } from "express";

const product = Router();

product.get("/:id", (req, res) => res.send(req.params.id));

product.post("", (req, res) => {});

export default product;
