import { Request, Response } from "express";
import { ServerResponse } from "../types/general/server_response";

export class MarketController {
  static find(req: Request, res: Response<ServerResponse>) {
    const response: ServerResponse = {
      message: "market !",
      success: true,
    };

    res.send(response);
  }
}
