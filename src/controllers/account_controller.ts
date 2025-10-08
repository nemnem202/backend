import { Request, Response } from "express";

export class AccountController {
  static register = (req: Request, res: Response) => {
    res.send("account register !");
  };

  static login = (req: Request, res: Response) => {
    res.send("account login !");
  };

  static get_account_infos = (req: Request, res: Response) => {
    res.send("account login !");
  };
}
