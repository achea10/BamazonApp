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
	allProducts();
});

function allProducts () {
	connection.query("SELECT *FROM products", function (err, results) {
		if (err) throw err; 
		for (var i = 0; i < results.length; i++) {
			console.log(results[i].item_id + " | " + results[i].product_name + " | " + results[i].price);
		}
		buyProduct();
	})

}


function buyProduct () {
	inquirer.prompt ([
		{
		name: "id",
		type: "input",
		message: "What is the item number of the product you want?"
		},

		{
		name: "quantity",
		type: "input",
		message: "How much of it do you want?"
		}
	]).then(function(input) {
		for (var i=0; i< results.length; i++) {
			if (results[i].item_id === parseInt(input.id)) {
				if (results[i].stock_quantity < parseInt(input.quantity)) {
					console.log("Insufficient quantity!");
					buyProduct();
				} else {
					var amount = parseFloat(input.stock_quantity*results[i].price).toFixed(2);
					var updateStock = results[i].stock_quantity-input.quantity;

					var update = "UPDATE 'products' SET 'stock_quantity' = " + updateStock + "WHERE 'item_id' = " + input.id 
					connection.query(update, function(err, results) {
						if (err) throw err;
						 else {
							console.log(results.affectedRows + " updated");
						}
					});

					console.log("You purchased " + input.quantity + " " + results[i].product_name);
					console.log("It costs you " + amount);
				}
			}
		}
	});
};

