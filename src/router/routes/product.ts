import { Router } from "express";
import { ProductController } from "../../controllers/product_controller";

const product = Router();

product.get("/user/:id", (req, res) => ProductController.get_by_user_id(req, res));

product.get("/:id", (req, res) => ProductController.get_by_id(req, res));

product.post("", (req, res) => ProductController.post_product(req, res));

export default product;
