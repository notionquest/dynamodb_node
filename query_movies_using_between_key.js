var AWS = require("aws-sdk");

var creds = new AWS.Credentials('akid', 'secret', 'session');

AWS.config.update({
	region: "us-west-2",
	endpoint: "http://localhost:8000",
	credentials: creds
});

var docClient = new AWS.DynamoDB.DocumentClient();

var table = "Movies";

var year_val = 2010;
var title = "The Big New Movie 2010";

var params = {
	TableName: table,
	KeyConditionExpression: 'yearkey = :hkey1 and title between :title1 and :title2',
	ExpressionAttributeValues: {
		':hkey1': 2011,
		':title1': 'The Big New Movie 2010',
		':title2': 'The Big New Movie 2010'
	}
};

docClient.query(params, function (err, data) {
		if (err) {
			console.error("Unable to read item. Error JSON:", JSON.stringify(err,
				null, 2));
		} else {
			console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
		}
	});