import Repository from "../lib/repository";
import { TableName } from "../types/general/table_names";
import { Category, CategoryDTO } from "../types/tables/category";

export class CategoryRepository extends Repository<CategoryDTO, Category> {
  protected tableName: TableName = "category";
}
