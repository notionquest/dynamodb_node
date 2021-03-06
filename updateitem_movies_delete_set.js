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
			"yearkey" : 2016,
			"title" : "The Big New Movie 1"
		},
		UpdateExpression : "REMOVE #category ",
		ExpressionAttributeNames: {
			'#category' : 'category',
			
		},
		//ExpressionAttributeValues: {':transaction_ids' : {'SS' : transactionIds}},
			//':empty_set' : {'SS' : []}},
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