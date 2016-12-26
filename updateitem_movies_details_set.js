var AWS = require("aws-sdk");
var creds = new AWS.Credentials('akid', 'secret', 'session');

AWS.config.update({
	region : "us-west-2",
	endpoint : "http://localhost:8000",
	credentials : creds
});

var docClient = new AWS.DynamoDB.DocumentClient();

var params = {
		TableName : "Movies",
		Key : {
			"yearkey" : 1999,
			"title" : "List test title"
		},
		UpdateExpression : "ADD #transaction_ids :transaction_ids ",
		ExpressionAttributeNames: {
			'#transaction_ids' : 'transaction_ids',
			
		},
		ExpressionAttributeValues: {':transaction_ids' :  docClient.createSet(["3"])},
		ReturnValues: 'UPDATED_NEW'
	};

console.log("Updating the item...");
docClient.update(params, function(err, data) {
	if (err) {
		console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
	} else {
		console.log("UpdateItem succeeded:", JSON.stringify(data));
	}
});