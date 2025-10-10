import { Request, Response } from "express";
import { ServerResponse } from "../types/general/server_response";
import { Product } from "../types/tables/product";
import { ZodSchema } from "../lib/zod_schemas";

export class MarketController {
  static find(req: Request, res: Response<ServerResponse>) {
    const response: ServerResponse = {
      message: "market !",
      success: true,
    };

    res.send(response);
  }

  createProduct(req:Request, res:Response<ServerResponse>){

    const postedProduct:Product = {
      account_id: req.body.account_id,
      available_quantity: req.body.available_quantity,
      id: req.body.id,
      number_of_reports: 0,
      number_of_sells: 0,
      product_description: req.body.product_description,
      product_image_path: req.body.product_image_path,
      product_name: req.body.product_name,
      product_price: req.body.product_price,
      suspended: false,
    }

    const validation = ZodSchema.product.safeParse(postedProduct)

  }

}
