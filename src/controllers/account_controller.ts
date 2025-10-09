import { Request, Response } from "express";
import { ServerResponse } from "../types/general/server_response";

export class AccountController {
  static register = (req: Request, res: Response<ServerResponse>) => {
    const response: ServerResponse = {
      message: "account infos !",
      success: true,
    };
    res.send(response);
  };

  static login = (req: Request, res: Response<ServerResponse>) => {
    const response: ServerResponse = {
      message: "account infos !",
      success: true,
    };
    res.send(response);
  };

  static get_account_infos = (req: Request, res: Response<ServerResponse>) => {
    const response: ServerResponse = {
      message: "account infos !",
      success: true,
    };
    res.send(response);
  };
}
