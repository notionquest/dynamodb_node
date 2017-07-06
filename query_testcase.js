var AWS = require("aws-sdk");
var dynoItemSize = require('dyno-item-size');

var creds = new AWS.Credentials('akid', 'secret', 'session');

AWS.config.update({
	region : "us-west-2",
	endpoint : "http://localhost:8000",
	credentials : creds
});

var docClient = new AWS.DynamoDB.DocumentClient();

var table = "testcase";

var params = {
	TableName : table,
	KeyConditionExpression : '#name = :hkey',
	FilterExpression: 'words.the < :wordval1 and words.the = :wordval2 and  words.brown > :wordval3',
    ExpressionAttributeNames : {
		'#name' : 'name'
	},
	ExpressionAttributeValues : {
		':hkey' : 'testcase 1',
		':wordval1' : 2,
        ':wordval2' : 1,
        ':wordval3' : 3
	}
};

docClient.query(params, function(err, data) {
	if (err) {
		console.error("Unable to read item. Error JSON:", JSON.stringify(err,
				null, 2));
	} else {
		console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
		console.log(data.Items);
		console.log("Item size ===>" + dynoItemSize(data));
	}
});