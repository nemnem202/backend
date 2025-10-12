import { Router } from "express";
import { MarketController } from "../../controllers/market_controller";
import multer from "multer";

const market = Router();
const upload = multer({dest: 'uploads/'})

market.get("", (req, res) => MarketController.find(req, res));
market.post("/create-product", upload.single('productImage') ,(req, res) => MarketController.createProduct(req, res));

export default market;
