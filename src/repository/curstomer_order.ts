import Repository from "../lib/repository";
import { TableName } from "../types/general/table_names";
import { CustomerOrder, CustomerOrderDTO } from "../types/tables/customer_order";

export class CustomerOrderRepository extends Repository<CustomerOrderDTO, CustomerOrder> {
  protected tableName: TableName = "customer_order";
}
