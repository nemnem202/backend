import Repository from "../lib/repository";
import { TableName } from "../types/general/table_names";
import { Account, AccountDTO } from "../types/tables/accounts";

export class AccountRepository extends Repository<AccountDTO, Account> {
  protected tableName: TableName = "account";
}
