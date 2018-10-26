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

var productToPurchase;

var amountToPurchase;

var newProductAmount;

function selectProduct() {
    inquirer
        .prompt([{
            name: "product",
            type: "input",
            message: "What is the ID number of the product you would like to buy?"
        }])
        .then(function (answer) {
            var query = "SELECT * FROM products WHERE ?";
            connection.query(query, {
                item_id: answer.product
            }, function (err, res) {
                console.log("Product selected: " + res[0].product_name + "\n");
                selectAmount();
                productToPurchase = res[0].product_name;
                return productToPurchase;
            });
        });
}

function selectAmount() {
    inquirer
        .prompt([{
            name: "amount",
            type: "input",
            message: "How many do you want to buy?"
        }])
        .then(function (answer) {
            var query = "SELECT * FROM products WHERE ?";
            connection.query(query, {
                product_name: productToPurchase
            }, function (err, res) {
                console.log("You have selected to purchase: " + answer.amount + " " + res[0].product_name + "s. Let us check our inventory...");
                amountToPurchase = answer.amount;
                newProductAmount = res[0].stock_quantity - amountToPurchase;
                console.log("There are " + res[0].stock_quantity + " products left.");
                if (res[0].stock_quantity >= answer.amount) {
                    purchaseAmount();
                    return amountToPurchase, newProductAmount;
                } else {
                    console.log("Sorry, there are not enough left in stock. Try again.");
                    connection.end();
                }
            })
        });
}

function purchaseAmount() {
    var query = "UPDATE products SET ? WHERE ?";
    connection.query(query, [{
            stock_quantity: newProductAmount
        },
        {
            product_name: productToPurchase
        }
    ], function (err, res) {
        console.log("Hurray! You have purchased " + amountToPurchase + " " + productToPurchase + "s.");
        console.log("Now there are '" + newProductAmount + "' " + productToPurchase +
            "s left in stock.");
        whatNext();
    })
}

function whatNext() {
    inquirer
    .prompt([{
        type: "confirm",
        name: "next",
        message: "Would you like to purchase another product?",
        default: true
    }])
    .then(function (answer) {
        if (answer.next){
            displayProducts();
        } else {
            console.log("Come back again soon!");
            connection.end();
        }
    });
}