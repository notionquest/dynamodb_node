var AWS = require("aws-sdk");

var creds = new AWS.Credentials('akid', 'secret', 'session');

AWS.config.update({
	region : "us-west-2",
	endpoint : "http://localhost:8000",
	credentials : creds
});

var docClient = new AWS.DynamoDB.DocumentClient();

var table = "Movies";

var year_val = 2016;
var title = "The Big New Movie 2012";

var createdate = "none";

var params = {
	TableName : table,
	KeyConditionExpression : 'yearkey = :hkey and title = :rkey',
	FilterExpression : 'createdate = :createdate OR #createdateAttribute = :createdate',
	ExpressionAttributeNames : {
		'#createdateAttribute' : 'none'
	},
	ExpressionAttributeValues : {
		':hkey' : year_val,
		':rkey' : title,
		":createdate" : createdate
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