import Repository from "../lib/repository";
import { TableName } from "../types/general/table_names";
import { AdminAccount, AdminAccountDTO } from "../types/tables/accounts";

export default class AdminAccountRepository extends Repository<AdminAccountDTO, AdminAccount> {
  protected tableName: TableName = "administrator";
}
