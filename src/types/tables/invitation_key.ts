export type InvitationKeyDTO = {
  code: string;
  relate_to_user_with_id: number | null;
  created_by_modo_with_id: number;
};

export type InvitationKey = InvitationKeyDTO & { id: number };
