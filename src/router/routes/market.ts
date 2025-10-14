import { Router } from "express";
import { MarketController } from "../../controllers/market_controller";
import AuthMiddleWare from "../../lib/middlewares/auth";

import uploadImage from "../../lib/middlewares/config-multer";

const market = Router();

market.get(
  "",
  (req, res, next) => AuthMiddleWare.protect_user_route(req, res, next),
  (req, res) => MarketController.find(req, res)
);

/** Think to reanable this route and delete the next one */

/** market.post(
  "/create-product",
  (req, res, next) => AuthMiddleWare.protect_vendor_route(req, res, next),
  (req, res) => MarketController.createProduct(req, res)
); **/

market.post(
  "/create-product",
  uploadImage.single('productImage'),
  (req, res) => MarketController.createProduct(req, res)
);


market.post(
  "",
  (req, res, next) => AuthMiddleWare.protect_vendor_route(req, res, next),
  (req, res, next) => uploadMiddleWare.single("productImage"),
  (req, res) => MarketController.createProduct(req, res)
);

export default market;
