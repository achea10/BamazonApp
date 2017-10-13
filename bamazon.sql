DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (
item_id INT,
product_name VARCHAR(50),
department_name VARCHAR(50),
price DECIMAL(10,2) NOT NULL,
stock_quantity INT
);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity) 
values (51234, 'Queen Comforter', 'Home', 57.99, 10);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity) 
values (54321, 'Desk Lamp', 'Home', 29.99, 10);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity) 
values (45213, 'Leather Jacket', 'Menswear', 89.99, 10);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity) 
values (12543, 'V-Neck Sweater', 'Menswear', 24.99, 10);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity) 
values (21345, 'Boyfriend Jeans', 'Womenswear', 39.99, 10);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity) 
values (31524, 'Maxi Dress', 'Womenswear', 19.99, 10);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity) 
values (24135, 'Necklace', 'Accessories', 10.99, 10);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity) 
values (41253, 'Bracelet', 'Accessories', 5.99, 10);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity) 
values (14235, 'Heels', 'Shoes', 44.95, 10);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
values (25413, 'Sneakers', 'Shoes', 59.99, 10);