var AWS = require("aws-sdk");
var dynoItemSize = require('dyno-item-size');
var creds = new AWS.Credentials('akid', 'secret', 'session');

AWS.config.update({
	region : "us-west-2",
	endpoint : "http://localhost:8000",
	credentials : creds
});

var docClient = new AWS.DynamoDB.DocumentClient();

var table = "autotable";

var params = {
	TableName : table,
	Item : {
		"autoID" : "yyy",
		"alexandriaID" : "id3",
		"docType" : "boo",
		"username" : "good",
		"userdescription" : "user description",
		"comment" : "complex condition"
	}
};

console.log("Adding a new item...");
console.log("Size of item =====>" + dynoItemSize(params.Item));
docClient.put(params, function(err, data) {
	if (err) {
		console.error("Unable to add item. Error JSON:", JSON.stringify(err,
				null, 2));
	} else {
		console.log("Added item:", JSON.stringify(data, null, 2));
	}
});