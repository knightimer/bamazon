DROP DATABASE IF EXISTS bamazon_DB;
CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products (
 id INTEGER(11) NOT NULL AUTO_INCREMENT,
 product_name VARCHAR(50) NOT NULL,
 department_name VARCHAR(50) NOT NULL,
 price INTEGER (10) NOT NULL,
 stock_quantity INTEGER (10)NULL,
 PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Sleeping bag","Camping", 250, 25);

INSERT INTO products (product_name,department_name, price, stock_quantity)
VALUES ("Stove","Kitchen", 50, 25);

INSERT INTO products (product_name,department_name, price, stock_quantity)
VALUES ("Knives","Kitchen", 50, 25);

INSERT INTO products (product_name,department_name, price, stock_quantity)
VALUES ("Axe","Camping", 30, 25);

INSERT INTO products (product_name,department_name, price, stock_quantity)
VALUES ("Tent","Camping", 250, 25);

INSERT INTO products (product_name,department_name, price, stock_quantity)
VALUES ("Blanket","Camping", 50, 25);

INSERT INTO products (product_name,department_name, price, stock_quantity)
VALUES ("Jacket","Clothing", 150, 25);

INSERT INTO products (product_name,department_name, price, stock_quantity)
VALUES ("Shorts","Clothing", 70, 25);

INSERT INTO products (product_name,department_name, price, stock_quantity)
VALUES ("Pots","Kitchen", 250, 25);

INSERT INTO products (product_name,department_name, price, stock_quantity)
VALUES ("Hammock","Camping", 250, 25);

SELECT * FROM products;   