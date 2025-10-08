import { Router } from "express";
import market from "./routes/market";
import product from "./routes/product";
import account from "./routes/account";

const router = Router();

router.use("/market", market);
router.use("/product", product);
router.use("/account", account);

export default router;
