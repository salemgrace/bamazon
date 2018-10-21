DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
	item_id INT NOT NULL auto_increment,
    product_name VARCHAR(100),
    department_name VARCHAR(100),
    price DECIMAL(10,2),
    stock_quantity INTEGER(10),
	PRIMARY KEY(item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("Table","Furniture", 130.50, 500), ("Couch","Furniture", 200.00, 100),("Coffee Mug","Kitchen", 7.99, 900),
	("Mixing Bowls","Kitchen", 25.00, 250), ("Lamp","Furniture", 40.50, 75), ("Vase","Decorations", 15.99, 300),
	("Mirror","Decorations", 75.99, 425), ("Set of Silverware","Kitchen", 50.00, 250), ("Candle","Decorations", 7.00, 750),
    ("Arm Chair","Furniture", 125.50, 100);


SELECT * FROM products