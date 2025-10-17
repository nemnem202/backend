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
import InvitationKeyRepository from "../repository/Invitation_key";
import { InvitationKeyDTO } from "../types/tables/invitation_key";
import { is_valid_session_name } from "../types/general/session_names";
import { SessionToken } from "../types/general/session_token";

dotenv.config();

export class AccountController {
  private static adminrepo = new AdminAccountRepository();
  private static userRepo = new AccountRepository();
  private static invite_key_repo = new InvitationKeyRepository();

  static register = async (
    req: Request,
    res: Response<ServerResponse>
  ): Promise<Response<ServerResponse>> => {
    try {
      const { username, password, invite_key } = req.body;

      const user_is_already_here = await this.userRepo.finOneBy("username", username);

      if (user_is_already_here)
        res.send({
          message: "l'utilisateur est déja enregistré",
          success: false,
        });

      const existing_invite_key = await this.invite_key_repo.finOneBy("code", invite_key);

      if (!existing_invite_key) {
        return res.send({ message: "inexistant invite key !", success: false });
      }
      if (existing_invite_key.relate_to_user_with_id) {
        return res.send({ message: "invite key already allocated !", success: false });
      }

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

      const set_user = await this.userRepo.add_item(new_user);

      if (!set_user) {
        throw new Error();
      }

      const invite_key_dto: InvitationKeyDTO = {
        code: existing_invite_key.code,
        created_by_modo_with_id: existing_invite_key.created_by_modo_with_id,
        relate_to_user_with_id: set_user.id,
      };

      const update = await this.invite_key_repo.update_item(invite_key_dto, existing_invite_key.id);

      if (!update) {
        throw new Error();
      }

      const response: ServerResponse = {
        message: "user",
        success: true,
      };
      return res.send(response);
    } catch (err) {
      if (err instanceof ZodError) {
        return res.send({ message: err.issues[0].message, success: false });
      } else {
        return res.send({ message: "une erreur innatendue est survenue", success: false });
      }
    }
  };

  static register_modo = async (req: Request, res: Response<ServerResponse>) => {
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
        is_modo: true,
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

    if (
      user &&
      (await PasswordHandler.chech_validity(password, user.password)) === true &&
      !user.suspended
    ) {
      return AccountController.handleUserLogin(user, res);
    } else if (user && user.suspended) {
      return res.send({ message: "accout suspended", success: false });
    }

    res.send({ message: "invalid username or password", success: false });
  };

  static disconnect = async (req: Request, res: Response<ServerResponse>) => {
    res.cookie("session_token", "", {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      expires: new Date(0),
    });

    res.send({ message: "disconnected !", success: true });
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

    if (!userInfos) return res.send({ message: "could not get session", success: false });

    if ("username" in userInfos && "user_id" in userInfos && "admin" in userInfos) {
      console.log("session valide pour ", userInfos.admin ? "admin" : "user");
      return res.send({ message: userInfos.admin ? "admin" : "user", success: true });
    } else {
      return res.send({ message: "invalid data", success: false });
    }
  };

  private static handleAdminLogin(admin: AdminAccount, res: Response<ServerResponse>) {
    const cookie = CookieManager.generate_cookie_with_token(res, {
      vendor: false,
      admin: true,
      modo: false,
      user: false,
      user_id: admin.id,
      username: admin.username,
    });

    if (!cookie) {
      return res.send({ message: "une erreur innatendue est survenue", success: false });
    }
    return res.send({ message: "admin", success: true });
  }

  private static handleUserLogin(user: Account, res: Response<ServerResponse>) {
    console.log("[login as user] :", user);
    const cookie = CookieManager.generate_cookie_with_token(res, {
      vendor: user.is_vendor ? true : false,
      admin: false,
      user: true,
      modo: user.is_modo ? true : false,
      user_id: user.id,
      username: user.username,
    });

    if (!cookie) {
      return res.send({ message: "une erreur innatendue est survenue", success: false });
    }

    console.log("api response: ", user.is_modo ? "modo" : user.is_vendor ? "vendor" : "user");
    return res.send({
      message: user.is_modo ? "modo" : user.is_vendor ? "vendor" : "user",
      success: true,
    });
  }

  static async getAllAccountsOfSameType(
    req: Request,
    res: Response<{ accounts: Account[] }>
  ): Promise<Response<{ accounts: Account[] }>> {
    try {
      const type = req.params.type;

      console.log("[GET ALL ACCOUNTS OF SAME TYPE] :", type);

      if (is_valid_session_name(type)) {
        console.log(type + " IS A VALID SESSION NAME");
        let accounts: Account[] | null = null;
        switch (type) {
          case "modo":
            accounts = await this.userRepo.findAllWhere("is_modo", true);
            break;
          case "vendor":
            accounts = await this.userRepo.findAllWhere("is_vendor", true);
            break;
          case "user":
            accounts = await this.userRepo.findAllWhere("is_modo", false);
            break;
        }
        return res.send({ accounts: accounts ?? [] });
      } else {
        return res.send({ accounts: [] });
      }
    } catch {
      return res.send({ accounts: [] });
    }
  }
  static async change_suspend_status(
    req: Request,
    res: Response<ServerResponse>
  ): Promise<Response<ServerResponse>> {
    console.log("[SUSPEND ?]");
    try {
      const { suspended } = req.body;
      const id = parseInt(req.params.id);

      const user = await this.userRepo.finOneBy("id", id);

      if (!user) {
        throw new Error();
      }
      user.suspended = suspended;
      const update = await this.userRepo.update_item(user, id);

      if (!update) {
        throw new Error();
      }

      console.log("[UPDATE] :", update);
      return res.send({
        message: `user with id: ${id} is now with suspended: ${suspended}`,
        success: true,
      });
    } catch (error) {
      console.error(req.body);
      return res.send({ message: "an error occured in suspend change", success: false });
    }
  }
}
