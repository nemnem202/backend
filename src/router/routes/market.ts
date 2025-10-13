import { Router } from "express";
import { MarketController } from "../../controllers/market_controller";
import uploadMiddleWare from "../../middleware/multer-config";

const market = Router();

market.get("", (req, res) => MarketController.find(req, res));
market.post("/create-product", uploadMiddleWare.single('productImage') ,(req, res) => MarketController.createProduct(req, res));

export default market;
