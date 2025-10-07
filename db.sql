CREATE TABLE category(
   id SERIAL PRIMARY KEY,
   category_name VARCHAR(100)  NOT NULL
);

CREATE TABLE account(
   id SERIAL PRIMARY KEY,
   suspended BOOLEAN,
   is_modo BOOLEAN,
   username VARCHAR(100)  NOT NULL,
   password VARCHAR(500)  NOT NULL,
   is_vendor BOOLEAN,
   number_of_reports INTEGER NOT NULL
);

CREATE TABLE administrator(
   id SERIAL PRIMARY KEY,
   username VARCHAR(100)  NOT NULL,
   password VARCHAR(500)  NOT NULL
);

CREATE TABLE product(
   id SERIAL PRIMARY KEY,
   product_name VARCHAR(100)  NOT NULL,
   suspended BOOLEAN,
   product_description VARCHAR(5000)  NOT NULL,
   product_price NUMERIC(15,2)   NOT NULL,
   product_image_path VARCHAR(500)  NOT NULL,
   number_of_sells INTEGER NOT NULL,
   number_of_reports INTEGER NOT NULL,
   available_quantity INTEGER NOT NULL,
   account_id INTEGER NOT NULL,
   FOREIGN KEY(account_id) REFERENCES account(id)
);

CREATE TABLE customer_order(
   id SERIAL PRIMARY KEY,
   order_date DATE NOT NULL,
   order_total_sum NUMERIC(15,2)   NOT NULL,
   is_current BOOLEAN NOT NULL,
   account_id INTEGER NOT NULL,
   FOREIGN KEY(account_id) REFERENCES account(id)
);

CREATE TABLE product_belong_category(
   product_id INTEGER NOT NULL,
   category_id INTEGER NOT NULL,
   PRIMARY KEY(product_id, category_id),
   FOREIGN KEY(product_id) REFERENCES product(id),
   FOREIGN KEY(category_id) REFERENCES category(id)
);

CREATE TABLE order_contain_product(
   product_id INTEGER NOT NULL,
   order_id INTEGER NOT NULL,
   PRIMARY KEY(product_id, order_id),
   FOREIGN KEY(product_id) REFERENCES product(id),
   FOREIGN KEY(order_id) REFERENCES customer_order(id)
);