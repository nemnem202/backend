import { Router } from "express";
import { InviteKeyController } from "../../controllers/invite_key_controller";
import AuthMiddleWare from "../../lib/middlewares/auth";

const invite_key = Router();

invite_key.get(
  "",
  (req, res, next) => AuthMiddleWare.protect_modo_route(req, res, next),
  (req, res) => InviteKeyController.get_key(req, res)
);

export default invite_key;
