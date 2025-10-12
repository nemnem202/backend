export type ServerResponse = {
  success: boolean;
  message: string;
  admin?: boolean;
  modo?: boolean;
  vendor?: boolean;
  user?: boolean;
};
