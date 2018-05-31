// connect to the bamazon sql databse

var inquirer = require("inquirer");
var mysql = require("mysql");
var colors = require("colors");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazon_db"
})

connection.connect(function (err) {
    if (err) throw err;
    console.log(("Connectd as id: " + connection.threadId).green);

    displayInventory(); 
});

// display all of the items available for sale.
function displayInventory(){
    connection.query(
        "SELECT * FROM products",
        function(err, res) {
            if (err) throw err; 
           
            for (var i = 0; i < res.length; i++){
                console.log("____________________________________".blue);
                console.log("");
                console.log(("Product ID: " + res[i].id).yellow);
                console.log("");
                console.log(("Product Name: " + res[i].product_name).yellow);
                console.log("");
                console.log(("Department Name: " + res[i].department_name).yellow);
                console.log("");
                console.log(("Stock Quantity: " + res[i].stock_quantity).yellow);
                console.log("");
                console.log(( "Price: " + res[i].price).yellow);
                console.log("");
                console.log("____________________________________".blue);

            }
            selectProduct();

        });

}
function inquireForUpdates() {
    //inquire for input
    inquirer.prompt([{
        name: "action",
        type: "list",
        message: "Choose an option below to manage your store:",
        choices: ["Restock Inventory", "Add New Product", "Remove An Existing Product"]
    }]).then(function(answers) {
        //select user response, launch corresponding function
        switch (answers.action) {

            case 'Restock Inventory':
                restockRequest();
                break;

            case 'Add New Product':
                addRequest();
                break;

            case 'Remove An Existing Product':
                removeRequest();
                break;
        }
    });
}; //end inquireForUpdates