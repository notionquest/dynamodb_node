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
var title = "Movie with list of multiset";
var recordObj = [docClient.createSet(["K1", "K2" ,"K3"]) , docClient.createSet(["K4", "K5" ,"K6"]) ];

var params = {
    TableName:table,
    Item:{
        "yearkey": year,
        "title": title,
        "records" : recordObj
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