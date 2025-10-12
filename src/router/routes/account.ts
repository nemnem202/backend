import { Router } from "express";
import { AccountController } from "../../controllers/account_controller";

const account = Router();

account.post("/register", (req, res) => AccountController.register(req, res));
account.post("/login", (req, res) => AccountController.login(req, res));
account.get("/account", (req, res) => AccountController.get_account_infos(req, res));
account.get("/session", (req, res) => AccountController.get_session_infos(req, res));

export default account;
