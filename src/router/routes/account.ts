import { Router } from "express";
import { AccountController } from "../../controllers/account_controller";
import AuthMiddleWare from "../../lib/middlewares/auth";

const account = Router();

account.post("/register", (req, res) => AccountController.register(req, res));
account.post(
  "/register/modo",
  (req, res, next) => AuthMiddleWare.protect_admin_route(req, res, next),
  (req, res) => AccountController.register_modo(req, res)
);
account.post("/login", (req, res) => AccountController.login(req, res));

account.get("/disconnect", (req, res) => AccountController.disconnect(req, res));

account.get(
  "/account",
  (req, res, next) => AuthMiddleWare.protect_user_route(req, res, next),
  (req, res) => AccountController.get_account_infos(req, res)
);
account.get("/session", (req, res) => AccountController.get_session_infos(req, res));

account.get(
  "/all/:type",
  (req, res, next) => AuthMiddleWare.protect_modo_route(req, res, next),
  (req, res) => AccountController.getAllAccountsOfSameType(req, res)
);

account.post(
  "/suspend/:id",
  (req, res, next) => AuthMiddleWare.protect_modo_route(req, res, next),
  (req, res) => AccountController.change_suspend_status(req, res)
);

account.get(
  "/vendor/:id",
  (req, res, next) => AuthMiddleWare.protect_modo_route(req, res, next),
  (req, res) => AccountController.promote_to_vendor(req, res)
);

export default account;
