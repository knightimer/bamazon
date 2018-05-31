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
                console.log(( "Price: $ " + res[i].price).yellow);
                console.log("");
                console.log("____________________________________".blue);

            }
            selectProduct();

        });

}
// Shopper selects the product they want to buy
// Shopper chooses how many they want to buy
function selectProduct() {
    inquirer.prompt(
        {
            name: "productId",
            type: "input",
            message: "Please select an ID on which product you want to buy?",
            
        }).then(function(answer){
            connection.query("SELECT * FROM products WHERE ?",
            {id: answer.productId}, function(err, res){
            console.log((" You have chose product with id number: " + res[0].id + "\n").yellow);
                
            
            inquirer.prompt({   
                name: "productQuantity",
                type: "input",
                message: "Hou many would you like to buy?",
            }).then(function(response){
                if (response.productQuantity < res[0].stock_quantity){
                    console.log("");
                    console.log("____________________________________".blue);
                    console.log("");
                    console.log(("You would like to buy " + response.productQuantity).yellow);
                    console.log("");
                    var remainingStock = res[0].stock_quantity - response.productQuantity;
                    console.log("");
                    console.log(("Inventory Remaining: " + remainingStock).yellow);
                    console.log("");
                    console.log(("Price: $" + response.productQuantity * res[0].price + ".00").yellow);
                    console.log("");

                }
                else {
                    console.log(("Insufficient stock").yellow);
                    
                }

                connection.query("UPDATE products SET stock_quantity= " + remainingStock +
                "WHERE id = " +res[0].id, function(err, res){
                    if (res) {
                        console.log(res);
                    }
                    else {
                        console.log(("Thank you for shopping!").red);
                        console.log("");
                    }                  
                    connection.end();
                })
                 
            });
                    
            
            });  
        });
}

