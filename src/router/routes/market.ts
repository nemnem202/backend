import { Router } from "express";
import { MarketController } from "../../controllers/market_controller";
import uploadMiddleWare from "../../middleware/multer-config";

const market = Router();

import AuthMiddleWare from "../../lib/middlewares/auth";

const market = Router();

market.get(
  "",
  (req, res, next) => AuthMiddleWare.protect_user_route(req, res, next),
market.post("/create-product", uploadMiddleWare.single('productImage') ,(req, res) => MarketController.createProduct(req, res));
);

export default market;
