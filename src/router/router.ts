import { Router } from "express";
import market from "./routes/market";
import product from "./routes/product";
import account from "./routes/account";
import invite_key from "./routes/invite_key";

const router = Router();

router.use("/market", market);
router.use("/product", product);
router.use("/account", account);
router.use("/invite_key", invite_key);

export default router;
