import { Router } from "express";
import { MarketController } from "../../controllers/market_controller";
import AuthMiddleWare from "../../lib/middlewares/auth";

const market = Router();

market.get(
  "",
  (req, res, next) => AuthMiddleWare.protect_user_route(req, res, next),
  (req, res) => MarketController.find(req, res)
);

export default market;
