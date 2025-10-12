import { NextFunction, Request, Response } from "express";
import { SessionToken } from "../../types/general/session_token";
import { ServerResponse } from "../../types/general/server_response";
import { CookieManager } from "../cookie_manager";

export default class AuthMiddleWare {
  static protect_admin_route = async (req: Request, res: Response, next: NextFunction) => {
    const session_token = CookieManager.parse(req);
    if (session_token && session_token.admin) {
      return next();
    } else {
      const response: ServerResponse = {
        message: "no session",
        success: false,
        admin: false,
      };
      return res.send(response);
    }
  };

  static protect_user_route = async (req: Request, res: Response, next: NextFunction) => {
    const session_token = CookieManager.parse(req);
    if (session_token && session_token.user) {
      return next();
    } else {
      const response: ServerResponse = {
        message: "no session",
        success: false,
        user: false,
      };
      return res.send(response);
    }
  };

  static protect_modo_route = async (req: Request, res: Response, next: NextFunction) => {
    const session_token = CookieManager.parse(req);
    if (session_token && session_token.modo) {
      return next();
    } else {
      const response: ServerResponse = {
        message: "no session",
        success: false,
        modo: false,
      };
      return res.send(response);
    }
  };
}
