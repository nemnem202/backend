import { Request, Response } from "express";

export class ProductController {
  static get_by_id = (req: Request, res: Response) => {
    res.send(req.params.id);
  };

  static get_by_user_id = (req: Request, res: Response) => {
    res.send("products of user : " + req.params.id);
  };

  static post_product = (req: Request, res: Response) => {
    res.send("produit posté !");
  };
}
