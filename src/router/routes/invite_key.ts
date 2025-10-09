import { Router } from "express";
import { InviteKeyController } from "../../controllers/invite_key_controller";

const invite_key = Router();

invite_key.get("", (req, res) => InviteKeyController.get_key(req, res));

export default invite_key;
