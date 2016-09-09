var AWS = require("aws-sdk");

AWS.config.update({
	region : "us-west-2",
	endpoint : "http://localhost:8000"
});

var docClient = new AWS.DynamoDB.DocumentClient();

var table = "users";

var userid = 1;

var params = {
	TableName : table,
	Item : {
		"id" : userid,
		"name" : "user1",
		"password" : "userpwd",
		//"friends" : {L: ["f1"]}
		"friends" : ["f1"]
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