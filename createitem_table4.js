var AWS = require("aws-sdk");

AWS.config.update({
	region : "us-west-2",
	endpoint : "http://localhost:8000"
});

var docClient = new AWS.DynamoDB.DocumentClient();

var table = "table4";

var userid = "ME 21";
var ts = null;

var params = {
	TableName : table,
	Item : {
		"userid" : userid,
		"ts" : 1509353619
	}
};

console.log("Adding a new item...");
docClient.put(params, function(err, data) {
	if (err) {
		console.error("Unable to add item. Error JSON:", JSON.stringify(err,
				null, 2));
	} else {
		console.log("Added item:", JSON.stringify(data, null, 2));
	}
});