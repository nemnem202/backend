import Repository from "../lib/repository";
import { TableName } from "../types/general/table_names";
import { ProductBelongCategory } from "../types/tables/relations";

export class ProductBelongCategoryRepository extends Repository<
  ProductBelongCategory,
  ProductBelongCategory
> {
  protected tableName: TableName = "product_belong_category";
}
