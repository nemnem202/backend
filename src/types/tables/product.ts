export type ProductDTO = {
  product_name: string;
  suspended?: boolean;
  product_description: string;
  product_price: number;
  product_image_path: string;
  number_of_sells: number;
  number_of_reports: number;
  available_quantity: number;
  account_id: number;
};

export type Product = ProductDTO & { id: number };
