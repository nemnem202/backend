import { NextFunction, Request, Response } from "express";
import { SessionToken } from "../../types/general/session_token";
import { ServerResponse } from "../../types/general/server_response";
import { CookieManager } from "../cookie_manager";
import { AccountRepository } from "../../repository/account";

export default class AuthMiddleWare {
  private static accountRepo = new AccountRepository();

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
    const sessionToken = CookieManager.parse(req);

    const sendNoSession = () =>
      res.send({
        message: "no session",
        success: false,
        user: false,
      } as ServerResponse);

    if (!sessionToken || !(sessionToken.user === true || sessionToken.admin === true)) {
      return sendNoSession();
    }

    // Admins bypass user checks
    if (sessionToken.admin) {
      return next();
    }

    try {
      const user = await this.accountRepo.finOneBy("id", sessionToken.user_id);

      if (!user || user.suspended) {
        return sendNoSession();
      }

      return next();
    } catch {
      // Treat repository errors as missing/invalid session
      return sendNoSession();
    }
  };

  static protect_modo_route = async (req: Request, res: Response, next: NextFunction) => {
    const session_token = CookieManager.parse(req);
    if (session_token && (session_token.modo === true || session_token.admin === true)) {
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

  static protect_vendor_route = async (req: Request, res: Response, next: NextFunction) => {
    const session_token = CookieManager.parse(req);
    if (session_token && (session_token.vendor === true || session_token.admin === true)) {
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
}
