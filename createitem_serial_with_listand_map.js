var AWS = require("aws-sdk");

AWS.config.update({
	region: "us-west-2",
	endpoint: "http://localhost:8000"
});

var docClient = new AWS.DynamoDB.DocumentClient();

var table = "serial";


var params = {
	TableName: table,
	Item: {
		"deviceSerialId": 5,
		"clustermembers": [
			{
				"email": "abc@teste.com",
				"role": "ADMIN",
				"id": "4bbe0f00-67c3-11e7-a6be-b9c9fc540ac2"
			},
			{
				"email": "teste@teste.com",
				"role": "ADMIN",
				"id": "4bbe0f00-67c3-11e7-a6be-b9c9fc540ac2"
			}			
		]
	}
};

console.log("Adding a new item...");
docClient.put(params, function (err, data) {
	if (err) {
		console.error("Unable to add item. Error JSON:", JSON.stringify(err,
			null, 2));
	} else {
		console.log("Added item:", JSON.stringify(data, null, 2));
	}
});