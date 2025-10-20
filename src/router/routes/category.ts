import { Router } from "express";
import { MarketController } from "../../controllers/market_controller";
import AuthMiddleWare from "../../lib/middlewares/auth";
import { CategoryController } from "../../controllers/category_controller";

const category = Router();

category.get(
    "",
    // (req, res, next) => AuthMiddleWare.protect_user_route(req, res, next),
    (req, res) => CategoryController.findAll(req, res)
);

export default category;