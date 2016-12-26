var AWS = require("aws-sdk");
var creds = new AWS.Credentials('akid', 'secret', 'session');

AWS.config.update({
  region: "us-west-2",
  endpoint: "http://localhost:8000",
  credentials : creds
});

var docClient = new AWS.DynamoDB.DocumentClient();

var table = "Movies";

var year = 1992;
var title = "Movie with list with map daily";
var recordArray = []; 
var user1 = {'test.com' : {'Impressions' : 3, 'Uniques' : 4}};

recordArray.push(user1);


var params = {
    TableName:table,
    Item:{
        "yearkey": year,
        "title": title,
        "daily" : recordArray
    }    
};

console.log("Adding a new item...");
docClient.put(params, function(err, data) {
    if (err) {
        console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Added item:", JSON.stringify(data, null, 2));
    }
});