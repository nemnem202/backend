import { Request, Response } from "express";
import { ServerResponse } from "../types/general/server_response";

export class ProductController {
  static get_by_id = (req: Request, res: Response<ServerResponse>) => {
    const response: ServerResponse = {
      message: req.params.id,
      success: true,
    };

    res.send(response);
  };

  static get_by_user_id = (req: Request, res: Response<ServerResponse>) => {
    const response: ServerResponse = {
      message: "user product :" + req.params.id,
      success: true,
    };

    res.send(response);
  };

  static post_product = (req: Request, res: Response<ServerResponse>) => {
    const response: ServerResponse = {
      message: "product sent !",
      success: true,
    };

    res.send(response);
  };
}
