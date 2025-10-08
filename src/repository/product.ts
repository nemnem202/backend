import Repository from "../lib/repository";
import { TableName } from "../types/general/table_names";
import { Product, ProductDTO } from "../types/tables/product";

export class ProductRepository extends Repository<ProductDTO, Product> {
  protected tableName: TableName = "product";
}
