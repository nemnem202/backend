import { Request, Response } from "express";
import { ServerResponse } from "../types/general/server_response";
import { Account, AccountDTO, AdminAccount } from "../types/tables/accounts";
import dotenv from "dotenv";
import { CookieManager } from "../lib/cookie_manager";
import AdminAccountRepository from "../repository/admin_account";
import { AccountRepository } from "../repository/account";
import { ZodError } from "zod";
import { ZodSchema } from "../lib/zod_schemas";
import { PasswordHandler } from "../lib/password_handler";

dotenv.config();

export class AccountController {
  private static adminrepo = new AdminAccountRepository();
  private static userRepo = new AccountRepository();

  static register = async (req: Request, res: Response<ServerResponse>) => {
    try {
      const { username, password, invite_key } = req.body;

      const user_is_already_here = await this.userRepo.finOneBy("username", username);

      if (user_is_already_here)
        res.send({
          message: "l'utilisateur est déja enregistré",
          success: false,
        });

      ZodSchema.user.parse({ username, password });

      const hashed_password = await PasswordHandler.generate_hash(password);

      if (!hashed_password) {
        throw new Error();
      }

      const new_user: AccountDTO = {
        number_of_reports: 0,
        password: hashed_password,
        username,
        is_modo: false,
        is_vendor: false,
        suspended: false,
      };

      const set_user = this.userRepo.add_item(new_user);

      if (!set_user) {
        throw new Error();
      }

      const response: ServerResponse = {
        message: "user",
        success: true,
      };
      res.send(response);
    } catch (err) {
      if (err instanceof ZodError) {
        res.send({ message: err.issues[0].message, success: false });
      } else {
        res.send({ message: "une erreur innatendue est survenue", success: false });
      }
    }
  };

  static login = async (req: Request, res: Response<ServerResponse>) => {
    const { username, password } = req.body;

    const admin = await this.adminrepo.finOneBy("username", username);

    if (admin && (await PasswordHandler.chech_validity(password, admin.password)) === true)
      return AccountController.handleAdminLogin(admin, res);

    const user = await this.userRepo.finOneBy("username", username);

    if (user && (await PasswordHandler.chech_validity(password, user.password)) === true)
      return AccountController.handleUserLogin(user, res);

    res.send({ message: "invalid username or password", success: false });
  };

  static get_account_infos = (req: Request, res: Response<ServerResponse | Account>) => {
    const response: ServerResponse = {
      message: "account infos !",
      success: true,
    };
    res.send(response);
  };

  static get_session_infos = (req: Request, res: Response<ServerResponse>) => {
    const userInfos = CookieManager.parse(req);

    console.log("[USER INFOS]", userInfos);

    if (!userInfos) return res.send({ message: "could not get session", success: false });

    if ("username" in userInfos && "user_id" in userInfos && "admin" in userInfos) {
      return res.send({ message: userInfos.admin ? "admin" : "user", success: true });
    } else {
      return res.send({ message: "invalid data", success: false });
    }
  };

  private static handleAdminLogin(admin: AdminAccount, res: Response<ServerResponse>) {
    const cookie = CookieManager.generate_cookie_with_token(res, {
      admin: true,
      user_id: admin.id,
      username: admin.username,
    });

    if (!cookie) {
      return res.send({ message: "une erreur innatendue est survenue", success: false });
    }

    console.log("[COOKIE] : ", cookie);
    return res.send({ message: "admin", success: true });
  }

  private static handleUserLogin(user: Account, res: Response<ServerResponse>) {
    const cookie = CookieManager.generate_cookie_with_token(res, {
      admin: false,
      user_id: user.id,
      username: user.username,
    });

    if (!cookie) {
      return res.send({ message: "une erreur innatendue est survenue", success: false });
    }
    console.log("[COOKIE] : ", cookie);
    return res.send({ message: "connect as user", success: true });
  }
}
