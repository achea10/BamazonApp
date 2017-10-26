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

function addInventory () {
	inquirer.prompt ([
	{
		name: "id",
		type: "input",
		message: "Enter the ID of the product you want"
	},
	{
		name: "amount",
		type: "input",
		message: "Enter the amount you want to add"
	}
	]).then(function(answer) {
		var query = connection.query ("UPDATE products SET ? WHERE ? ",
			[	
				{
					stock_quantity: + answer.amount
					//did not add to it just replaced it trying to figure out how to add with this code
				},
				{
					item_id: answer.id
				}
			],
			function(err,results) {
				console.log(results.affectedRows + "updated");
			managerMenu();
			}
		)
	})
};

function addProduct () {
	inquirer.prompt([
	{
		name: "name",
		type: "input",
		message: "What's the name of the new product?",
	},
	{
		name: "cost",
		type: "input",
		message: "How much does it cost?",
	},
	{
		name: "qty",
		type: "input",
		message: "How much in stock?",
	},
	{
		name: "id",
		type: "input",
		message: "What's it's unique id?",
	},
	{
		name: "dept",
		type: "list",
		message: "Which department are you looking to add it too",
		choices: ["Home", "Menswear", "Womenswear", "Accesories", "Shoes"]
	}
	]).then(function(input) {
		var query = connection.query("INSERT INTO products SET ?",
		{
			item_id: input.id,
			product_name: input.name,
			department_name: input.dept,
			price: input.cost,
			stock_quantity: input.qty
		},
		function(err, results) {
			console.log(results.affectedRows + "New product added");
			console.log(query.sql);
			managerMenu();
		}
		)
	})
};



