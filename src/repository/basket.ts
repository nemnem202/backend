import Repository from "../lib/repository";
import { TableName } from "../types/general/table_names";
import { BasketContainProduct } from "../types/tables/basket_contain_product";

export class BasketRepository extends Repository<BasketContainProduct, BasketContainProduct> {
  protected tableName: TableName = "basket_contain_product";
}
