export type AccountDTO = {
  username: string;
  password: string;
  number_of_reports: number;
  suspended?: boolean;
  is_vendor?: boolean;
  is_modo?: boolean;
};

export type Account = AccountDTO & { id: number };

export type AdminAccountDTO = {
  username: string;
  password: string;
};

export type AdminAccount = AdminAccountDTO & { id: number };
