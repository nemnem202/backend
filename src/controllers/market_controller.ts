import { Request, Response } from "express";
import { ServerResponse } from "../types/general/server_response";
import { Product, ProductDTO } from "../types/tables/product";
import { ZodSchema } from "../lib/zod_schemas";
import { ProductRepository } from "../repository/product";
import { ZodError } from "zod";
import { CloudinaryClient } from "../lib/CloudinaryClient";
import { UploadApiResponse } from "cloudinary";
import uploadImage from "../lib/middlewares/config-multer";
import { CookieManager } from "../lib/cookie_manager";
import { BasketRepository } from "../repository/basket";

export class MarketController {
  static productRepository = new ProductRepository();
  static basketRepository = new BasketRepository();

  static async find(req: Request, res: Response<ServerResponse | Product>) {
    const productId = req.params.id;
    const product = await this.productRepository.finOneBy("id", productId);

    if (!product) {
      const response: ServerResponse = {
        message: "Product not found!",
        success: false,
      };
      res.send(response);
      return;
    }

    res.send(product);
  }

  static async findAll(req: Request, res: Response<ServerResponse | Product[]>) {
    const products = await this.productRepository.findAll();

    if (!products) {
      const response: ServerResponse = {
        message: "No product found!",
        success: false,
      };
      res.send(response);
      return;
    }

    res.send(products);
  }

  static async createProduct(req: Request, res: Response<ServerResponse>) {
    const uploadedFile = req.file;
    console.log(`File : ${req.file}`);
    if (!uploadedFile) {
      console.log("Aucune image uploadée, abandon");
      res.status(501);
    } else {
      try {
        const cloudinaryClient = CloudinaryClient.getInstance();
        const uploadedImageLink = await cloudinaryClient.upload_img(uploadedFile.buffer);
        const postedProduct: ProductDTO = {
          account_id: 1, //Normal value to req.body.account_id
          available_quantity: parseInt(req.body.available_quantity),
          number_of_reports: 0,
          number_of_sells: 0,
          product_description: req.body.product_description,
          product_image_path: uploadedImageLink.url,
          product_name: req.body.product_name,
          product_price: parseInt(req.body.product_price),
          suspended: false,
        };
        console.log(postedProduct);
        const validation = ZodSchema.product.parse(postedProduct);
        const product = await this.productRepository.add_item(postedProduct);
      } catch (result) {
        if (result instanceof ZodError) {
          result.issues.forEach((issue) => {
            console.error(issue);
          });
        } else {
          console.error(result);
        }
      }
    }
  }

  static async postBasket(req: Request, res: Response<ServerResponse>) {
    const { product } = req.body;

    console.log(product);
  }

  static async getBasket(req: Request, res: Response<ServerResponse | Product[]>) {
    const userInfos = CookieManager.parse(req);

    if (!userInfos || !userInfos.user) {
      return res.send({ message: "invalid session", success: false });
    }

    const relations = await this.basketRepository.findAllWhere("user_id", userInfos.user_id);

    if (!relations) return res.send([]);

    const products: Product[] = (
      await Promise.all(
        relations.flatMap(async (item) => {
          const result = await this.productRepository.finOneBy("id", item.product_id);
          return result ? [result] : [];
        })
      )
    ).flat();

    res.send(products);
  }
}
