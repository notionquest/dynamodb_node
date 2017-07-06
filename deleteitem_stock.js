var AWS = require("aws-sdk");
var creds = new AWS.Credentials('akid', 'secret', 'session');

AWS.config.update({
	region : "us-west-2",
	endpoint : "http://localhost:8000",
	credentials : creds
});

var docClient = new AWS.DynamoDB.DocumentClient();

var params = {
		TableName : "stock",
		Key : {
			"ID" : '3'			
		}
		
	};

console.log("Deleting the item...");
docClient.delete(params, function(err, data) {
	if (err) {
		console.error("Unable to delete item. Error JSON:", JSON.stringify(err,
				null, 2));
	} else {
		console.log("Delete item succeeded:", JSON.stringify(data, null, 2));
	}
});