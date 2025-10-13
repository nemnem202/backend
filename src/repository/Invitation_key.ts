import Repository from "../lib/repository";
import { TableName } from "../types/general/table_names";
import { InvitationKey, InvitationKeyDTO } from "../types/tables/invitation_key";

export default class InvitationKeyRepository extends Repository<InvitationKeyDTO, InvitationKey> {
  protected tableName: TableName = "invitation_key";
}
