import { Router } from "express";
import { ProductController } from "../../controllers/product_controller";
import AuthMiddleWare from "../../lib/middlewares/auth";

const product = Router();

product.get(
  "/:user",
  (req, res, next) => AuthMiddleWare.protect_modo_route(req, res, next),
  (req, res) => ProductController.get_by_user_id(req, res)
);

product.get(
  "/:id",
  (req, res, next) => AuthMiddleWare.protect_user_route(req, res, next),
  (req, res) => ProductController.get_by_id(req, res)
);



export default product;
