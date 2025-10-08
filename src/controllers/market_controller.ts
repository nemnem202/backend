import { Request, Response } from "express";

export class MarketController {
  static find(req: Request, res: Response) {
    res.send("bonjour le marché");
  }
}
