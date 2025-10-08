export type CustomerOrderDTO = {
  order_total_sum: number;
  order_date: Date;
  is_current: boolean;
  account_id: number;
};

export type CustomerOrder = CustomerOrderDTO & { id: number };
