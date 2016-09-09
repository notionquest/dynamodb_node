var AWS = require("aws-sdk");
var attr = require('dynamodb-data-types').AttributeValue;

AWS.config.update({
  region: "us-west-2",
  endpoint: "http://localhost:8000"
});

var docClient = new AWS.DynamoDB.DocumentClient();

var params = {
    TableName : "Bag",
    KeyConditionExpression: "#bag = :bag AND #books = :books",
    //KeyConditionExpression: "#bag = :bag AND #books = :books",
    //KeyConditionExpression: "#bag = :bag",
    ExpressionAttributeNames:{
        "#bag": "bag",
        "#books" : "books"
    },
    ExpressionAttributeValues: {
        ":bag" : "b3",
        ":books":{"M":{}}
      //  ":books" : {"M" : "{}"}
        /*":books": { 
            "M" : "dd"
         }*/
    }
};

docClient.query(params, function(err, data) {
    if (err) {
        console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
    } else {
        console.log("Query succeeded.");        
        data.Items.forEach(function(item) {
        	//var unwrapped = attr.unwrap(item);
        	console.log(JSON.stringify(attr.wrap(item)));
        	console.log("Item :" + JSON.stringify(item));
            console.log(" -", item.bag + ": " + item.secondary + ":" + item.books);
        });
    }
});