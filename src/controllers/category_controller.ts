import { Request, Response } from "express";
import { ServerResponse } from "../types/general/server_response";
import { CategoryRepository } from "../repository/category";
import { Category } from "../types/tables/category";


export class CategoryController {
    static categoryRepository = new CategoryRepository();

    static async findAll(req: Request, res: Response<ServerResponse | Category[]>) {

        const categories = await this.categoryRepository.findAll();

        if (!categories) {
            const response: ServerResponse = {
                message: "No category found!",
                success: false,
            };
            res.send(response);
            return
        }

        res.send(categories);
    }
}

