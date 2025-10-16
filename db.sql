SELECT current_database(), current_user;

CREATE TABLE account (
    id SERIAL PRIMARY KEY,
    suspended BOOLEAN,
    is_modo BOOLEAN,
    username VARCHAR(100) NOT NULL,
    password VARCHAR(500) NOT NULL,
    is_vendor BOOLEAN,
    number_of_reports INTEGER NOT NULL
);

CREATE TABLE administrator (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(500) NOT NULL
);

CREATE TABLE category (
    id SERIAL PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL
);

CREATE TABLE basket (
    id SERIAL PRIMARY KEY,
    FOREIGN KEY (id) REFERENCES account (id)
);

CREATE TABLE product (
    id SERIAL PRIMARY KEY,
    product_name VARCHAR(100) NOT NULL,
    suspended BOOLEAN,
    product_description VARCHAR(5000) NOT NULL,
    product_price NUMERIC(15, 2) NOT NULL,
    product_image_path VARCHAR(500) NOT NULL,
    number_of_sells INTEGER NOT NULL,
    number_of_reports INTEGER NOT NULL,
    available_quantity INTEGER NOT NULL,
    account_id INTEGER NOT NULL,
    FOREIGN KEY (account_id) REFERENCES account (id)
);

CREATE TABLE customer_order (
    id SERIAL PRIMARY KEY,
    order_date DATE NOT NULL,
    order_total_sum NUMERIC(15, 2) NOT NULL,
    is_current BOOLEAN NOT NULL,
    account_id INTEGER NOT NULL,
    FOREIGN KEY (account_id) REFERENCES account (id)
);

CREATE TABLE invitation_key (
    id SERIAL PRIMARY KEY,
    code VARCHAR(200) NOT NULL,
    relate_to_user_with_id INTEGER UNIQUE,
    created_by_modo_with_id INTEGER NOT NULL,
    UNIQUE (code),
    FOREIGN KEY (relate_to_user_with_id) REFERENCES account (id),
    FOREIGN KEY (created_by_modo_with_id) REFERENCES account (id)
);

CREATE TABLE product_belong_category (
    product_id INTEGER NOT NULL,
    category_id INTEGER NOT NULL,
    PRIMARY KEY (product_id, category_id),
    FOREIGN KEY (product_id) REFERENCES product (id),
    FOREIGN KEY (category_id) REFERENCES category (id)
);

CREATE TABLE order_contain_product (
    product_id INTEGER NOT NULL,
    order_id INTEGER NOT NULL,
    PRIMARY KEY (product_id, order_id),
    FOREIGN KEY (product_id) REFERENCES product (id),
    FOREIGN KEY (order_id) REFERENCES customer_order (id)
);

CREATE TABLE basket_contain_product (
    basket_id      INTEGER NOT NULL,
    product_id     INTEGER NOT NULL,
    item_quantity  INTEGER NOT NULL,

    PRIMARY KEY (basket_id, product_id),
    FOREIGN KEY (basket_id) REFERENCES basket (id),
    FOREIGN KEY (product_id) REFERENCES product (id)
);