var AWS = require("aws-sdk");

AWS.config.update({
	region : "us-west-2",
	endpoint : "http://localhost:8000"
});

var docClient = new AWS.DynamoDB.DocumentClient();

var table = "users";

var userid = 1;
var friendId = ["675"];


//Add the new DOCUMENT TYPE attribute to the table
var params = {
	TableName : table,
	Key: {
		"id" : userid
	},
	"UpdateExpression": "ADD #friends :friendId",
	"ExpressionAttributeNames": { 
      "#friends" : "friends" 
   },
	"ExpressionAttributeValues": { 
        //":friendId": {"NS":["6", "2", "1"]}
		":friendId": {"S": "Friend 11423423"}
	},
    "ReturnValues" : "UPDATED_NEW"
};

console.log("Updated an item...");
docClient.update(params, function(err, data) {
	if (err) {
		console.error("Unable to update item. Error JSON:", JSON.stringify(err,
				null, 2));
	} else {
		console.log("Updated item:", JSON.stringify(data, null, 2));
	}
});