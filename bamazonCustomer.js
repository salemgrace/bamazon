var mysql = require("mysql");

var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    password: "password",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected as id: " + connection.threadId);
    displayProducts();
});

function displayProducts() {
    console.log("\nCURRENT PRODUCTS AVAILABLE:\n");

    var query = connection.query(
        "SELECT * FROM products",
        function (err, res) {
            for (var i = 0; i < res.length; i++) {
                console.log("ID: " + res[i].item_id);
                console.log("Item: " + res[i].product_name);
                console.log("Price: " + res[i].price);
                console.log("--------------------------------");
            }
            selectProduct();
        });
}

function selectProduct() {
    inquirer
        .prompt([{
                name: "product",
                type: "input",
                message: "What is the ID number of the product you would like to buy?"
            },
            {
                name: "amount",
                type: "input",
                message: "How many units do you want to buy?"
            }
        ])
        .then(function (answer) {
            console.log("You have selected the product with the ID of '" + answer.product + 
            "'.\nAnd you would like to purchase '" + answer.amount + "' units.");
        });
    connection.end()
}