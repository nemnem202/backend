const tables_names = [
    "category",
    "account",
    "administrator",
    "customer_order",
    "order_contain_product",
    "product",
    "product_belong_category"
] as const;

export type TableName = typeof tables_names[number];