var AWS = require("aws-sdk");
var creds = new AWS.Credentials('akid', 'secret', 'session');

AWS.config.update({
	region : "us-west-2",
	endpoint : "http://localhost:8000",
	credentials : creds
});

var docClient = new AWS.DynamoDB.DocumentClient();

var table = "cache";

var params = {
	TableName : table,
	Item : {
        "storage_CACHE_KEY" : "1",
        "GSRResults": [3.8,3.4,3.3,2.8,1.3,3.2,4.3,2.1,3.2,3.3]
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