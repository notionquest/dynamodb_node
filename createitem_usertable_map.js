var AWS = require("aws-sdk");
var creds = new AWS.Credentials('akid', 'secret', 'session');

AWS.config.update({
  region: "us-west-2",
  endpoint: "http://localhost:8000",
  credentials : creds
});

var docClient = new AWS.DynamoDB.DocumentClient();

var table = "usertable";

var params = {
    TableName:table,
    Item:{
        "userid": "John",
        "score": 600,  
        "sessions": [
            {
                "id": "123",
                "foo": "bar"
            }
        ]    
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