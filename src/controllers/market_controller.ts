import { Request, Response } from "express";
import { ServerResponse } from "../types/general/server_response";
import { Product, ProductDTO } from "../types/tables/product";
import { ZodSchema } from "../lib/zod_schemas";
import { ProductRepository } from "../repository/product";
import { CloudinaryClient } from "../lib/CloudinaryClient";
import { ZodError } from "zod";
import { UploadApiResponse } from "cloudinary";

export class MarketController {

  static productRepository = new ProductRepository();

  static find(req: Request, res: Response<ServerResponse>) {
    const response: ServerResponse = {
      message: "market !",
      success: true,
    };
    res.send(response);
  }

  static async createProduct(req: Request, res: Response<ServerResponse>) {

    try {
      console.log(req.body);
      const productImage = req.file;
      const cloudinaryClient = CloudinaryClient.getInstance();
      if (!productImage) {
        res.status(400)
        console.log('Aucune image transmise, abandon')
      }
      else {
        const uploadedImgLink:UploadApiResponse = await cloudinaryClient.upload_img(productImage.buffer);
        console.log(`Lien vers l'image : ${typeof uploadedImgLink.url}`)

        const postedProduct: ProductDTO = {
          account_id: 1, //Habituellement : req.body.account_id
          available_quantity: parseInt(req.body.available_quantity),
          number_of_reports: 0,
          number_of_sells: 0,
          product_description: req.body.product_description,
          product_image_path: uploadedImgLink.url,
          product_name: req.body.product_name,
          product_price: parseInt(req.body.product_price),
          suspended: false,
        }


        const validation = ZodSchema.product.parse(postedProduct)
        const product = await this.productRepository.add_item(postedProduct)
        console.log(`Product : ${product?.product_name}`)
        res.status(200);
      }

    }
    catch (result) {
      if (result instanceof ZodError) {
        result.issues.forEach((issue) => {
          console.error(issue);
        })
      }
      else {
        console.error(result);
      }
      res.status(400);
    }
  }

}
