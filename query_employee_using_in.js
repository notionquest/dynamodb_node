var AWS = require("aws-sdk");

var creds = new AWS.Credentials('akid', 'secret', 'session');

AWS.config.update({
	region : "us-west-2",
	endpoint : "http://localhost:8000",
	credentials : creds
});

var docClient = new AWS.DynamoDB.DocumentClient();

var table = "employee";

var params = {
	TableName : table,
	KeyConditionExpression : 'branch = :branchVal',
	FilterExpression : 'dept in (:deptVal)',
	ExpressionAttributeValues : {
		':branchVal' : 'UK',
        ':deptVal' : docClient.createSet([1,2])
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