import Repository from "../lib/repository";
import { TableName } from "../types/general/table_names";
import { OrderContainProduct } from "../types/tables/relations";

export class OrderContainProductRepository extends Repository<
  OrderContainProduct,
  OrderContainProduct
> {
  protected tableName: TableName = "order_contain_product";
}
