var AWS = require("aws-sdk");

AWS.config.update({
	region : "us-west-2",
	endpoint : "http://localhost:8000"
});

var docClient = new AWS.DynamoDB.DocumentClient();

var table = "users";

var userid = 1;
var friendId = ["f4"];
var friendIdStr = "f4";


//Updated conditionally
var params = {
	TableName : table,
	Key: {
		"id" : userid 
	},
	"UpdateExpression": "set friends = list_append (friends, :friendId)",
	"ConditionExpression": "not contains (friends, :friendIdStr)",
	"ExpressionAttributeValues": { 
        ":friendId": friendId,
        ":friendIdStr" : friendIdStr
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