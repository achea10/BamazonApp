var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
	host: "localhost",
	port: "3306",
	user: "root",
	password: "",
	database: "bamazon_DB"
});

connection.connect(function (err) {
	if (err) throw err;
	console.log("connected as id " + connection.threadId);
	allProducts ();
	buyProduct();
});

function allProducts () {
	var query = connection.query("SELECT item_id, product_name, price FROM products", function (err, res) {
		for (var i = 0; i < res.length; i++) {
			console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].price);
		}
	});
	console.log(query.sql);
};

function buyProduct () {
	inquirer.prompt ([
		{
		name: "id",
		type: "input",
		message: "What is the item number of the product you want?",
		},

		{
		name: "quantity",
		type: "input",
		message: "How much of it do you want?"
		}

	]).then(function(input) {
		for (var i=0 < results.length; i++) {
			if (results[i].item_id === parseInt(input.id)) {
				if (results[i].stock_quantity < pareInt(input.quantity)) {
					console.log("Insufficient quantity!");
					buyProduct();
				} else {
					var amount = parseFloat(input.stock_quantity*results[i].price).toFixed(2);
					var updateStock = results[i].stock_quantity-input.quantity;

					
				}
			}
		}
	})
}











