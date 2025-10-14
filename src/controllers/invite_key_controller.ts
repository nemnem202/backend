import { Request, Response } from "express";
import { ServerResponse } from "../types/general/server_response";
import { InvitationKeyDTO } from "../types/tables/invitation_key";
import { CookieManager } from "../lib/cookie_manager";
import InvitationKeyRepository from "../repository/Invitation_key";

export class InviteKeyController {
  static invitation_key_repo = new InvitationKeyRepository();
  static get_key = async (
    req: Request,
    res: Response<ServerResponse>
  ): Promise<Response<ServerResponse>> => {
    try {
      const modo_session = CookieManager.parse(req);

      if (!modo_session || !modo_session.user_id) {
        return res.send({ message: "session id's inorrects", success: false });
      }

      const key: InvitationKeyDTO = {
        code: crypto.randomUUID(),
        created_by_modo_with_id: modo_session.user_id,
        relate_to_user_with_id: null,
      };

      const post = await this.invitation_key_repo.add_item(key);

      if (!post) {
        throw new Error();
      }

      const response: ServerResponse = {
        message: key.code,
        success: true,
      };

      return res.send(response);
    } catch (err) {
      return res.send({ message: "internal server error", success: false });
    }
  };
}
