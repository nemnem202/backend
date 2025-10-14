import { Router } from "express";
import { MarketController } from "../../controllers/market_controller";
import AuthMiddleWare from "../../lib/middlewares/auth";
import uploadMiddleWare from "../../middleware/multer-config";

const market = Router();

market.get(
  "",
  (req, res, next) => AuthMiddleWare.protect_user_route(req, res, next),
  (req, res) => MarketController.find(req, res)
);

market.post(
  "",
  (req, res, next) => AuthMiddleWare.protect_vendor_route(req, res, next),
  (req, res, next) => uploadMiddleWare.single("productImage"),
  (req, res) => MarketController.createProduct(req, res)
);

export default market;
