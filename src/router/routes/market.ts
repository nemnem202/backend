import { Router } from "express";
import { MarketController } from "../../controllers/market_controller";

const market = Router();

market.get("", (req, res) => MarketController.find(req, res));
market.post("/create-product", (req, res) => MarketController.createProduct(req, res));

export default market;
