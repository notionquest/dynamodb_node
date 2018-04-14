var AWS = require("aws-sdk");

var creds = new AWS.Credentials('akid', 'secret', 'session');

AWS.config.update({
	region : "us-west-2",
	endpoint : "http://localhost:8000",
	credentials : creds
});

var docClient = new AWS.DynamoDB.DocumentClient();

var table = "gateway";

var params = {
	TableName : table,
	KeyConditionExpression : 'device_id = :deviceIdVal and timestampAttr between :t1 and :t2',	
	ExpressionAttributeValues : {
		':deviceIdVal' : 'd1',
        ':t1' : 20170101,
        ':t2' : 20171231
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