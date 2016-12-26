var AWS = require("aws-sdk");
var creds = new AWS.Credentials('akid', 'secret', 'session');

AWS.config.update({
  region: "us-west-2",
  endpoint: "http://localhost:8000",
  credentials : creds
});

var docClient = new AWS.DynamoDB.DocumentClient();

var table = "Movies";

var year = 1990;
var title = "Movie with list with map attributes";
var recordArray = []; 
var user1 = {'user_id' : 'xxx', 'share' : 1};
var user2 = {'user_id' : 'yyy', 'share' : 4};

recordArray.push(user1);
recordArray.push(user2);

var params = {
    TableName:table,
    Item:{
        "yearkey": year,
        "title": title,
        "users" : recordArray
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