var AWS = require("aws-sdk");

var creds = new AWS.Credentials('akid', 'secret', 'session');

AWS.config.update({
	region : "us-west-2",
	endpoint : "http://localhost:8000",
	credentials : creds
});

var docClient = new AWS.DynamoDB.DocumentClient();

var table = "empdept";

var params = {
	TableName : table,
    IndexName : "empdept_doj",
	KeyConditionExpression : 'date_of_joining > :doj',
	//FilterExpression : 'date_of_joining > :doj',
	ExpressionAttributeValues : {
		':doj' : '1981-01-01'		
	}
};

docClient.query(params, function(err, data) {
	if (err) {
		console.error("Unable to read item. Error JSON:", JSON.stringify(err,
				null, 2));
	} else {
		console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
	}
});