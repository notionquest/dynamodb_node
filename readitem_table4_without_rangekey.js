var AWS = require("aws-sdk");
var attr = require('dynamodb-data-types').AttributeValue;

AWS.config.update({
  region: "us-west-2",
  endpoint: "http://localhost:8000"
});

var docClient = new AWS.DynamoDB.DocumentClient();

var params = {
    TableName : "table4",
    KeyConditionExpression: "#userid = :userid",
    ExpressionAttributeNames:{
        "#userid": "userid"
        
    },
    ExpressionAttributeValues: {
        ":userid" : "user1"
        
    }
};

docClient.query(params, function(err, data) {
    if (err) {
        console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
    } else {
    	console.log(params);
        console.log("Query succeeded.");        
        data.Items.forEach(function(item) {
        	console.log(JSON.stringify(attr.wrap(item)));
        	//console.log("Item :" + JSON.stringify(item));
        });
    }
});