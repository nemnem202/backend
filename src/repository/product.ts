import Repository from "../lib/repository";
import { TableName } from "../types/general/table_names";
import { Product, ProductDTO } from "../types/tables/product";

export class ProductRepository extends Repository<ProductDTO, Product> {
  protected tableName: TableName = "product";

  findAllByCategory = async (value: string): Promise<Product[] | null> => {
    const query = {
      text: `SELECT * FROM product p
              JOIN 
                  product_belong_category pb ON p.id = pb.product_id
              JOIN 
                  category c ON pb.category_id = c.id
              WHERE 
                  c.category_name = $1;`,
      values: [value],
    };
    try {
      const result = await this.pool.query(query);
      const data = result.rows.map(this.fromRow);

      return data;
    } catch (error) {
      console.error(error);

      return null;
    }
  };
}
