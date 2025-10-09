import { Request, Response } from "express";
import { ServerResponse } from "../types/general/server_response";

export class InviteKeyController {
  static get_key = (req: Request, res: Response<ServerResponse>) => {
    const response: ServerResponse = {
      message: "invite key!",
      success: true,
    };

    res.send(response);
  };
}
