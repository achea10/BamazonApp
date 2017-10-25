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
	managerMenu();
});

function managerMenu () {
	inquirer.prompt({
		name: "menu",
		type: "list",
		message: "Where do you want to start?",
		choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
	
	}).then(function(answer) {
		switch (answer.menu) {
			case "View Products for Sale":
				return viewProducts();

			case "View Low Inventory":
				return lowInventory ();

			case "Add to Inventory":
				return addInventory();

			case "Add New Product":
				return addProduct();
		}
	});
};

function viewProducts () {
	connection.query("SELECT *FROM products", function (err, results) {
		if (err) throw err; 
		console.log("\n All Available Products \n");
		for (var i = 0; i < results.length; i++) {
			console.log(results[i].item_id + " | " + results[i].product_name + " | " + results[i].price + " | " + results[i].stock_quantity);
		}
		managerMenu();
	})
};

function lowInventory () {
	connection.query("SELECT * FROM products WHERE stock_quantity < 5", function (err, results) {
		if (err) throw err;
		console.log("\n Low Inventory Products \n");
		for (var i=0; i < results.length; i++) {
			console.log(results[i].item_id + " | " + results[i].product_name + " | " + results[i].price + " | " + results[i].stock_quantity);
		}
		managerMenu();
	})
};

function addInentory () {
	inquirer.prompt ({
		
	})
}




