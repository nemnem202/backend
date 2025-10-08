import { Request, Response } from "express";

export class InviteKeyController {
  static get_key = (req: Request, res: Response) => {
    res.send("get invite key !");
  };
}
