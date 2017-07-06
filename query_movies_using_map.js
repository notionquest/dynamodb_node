var AWS = require("aws-sdk");

var creds = new AWS.Credentials('akid', 'secret', 'session');

AWS.config.update({
	region : "us-west-2",
	endpoint : "http://localhost:8000",
	credentials : creds
});

var docClient = new AWS.DynamoDB.DocumentClient();

var table = "Movies";

var year_val = 2017;
var title = "Movie with nested map";

var params = {
	TableName : table,
	KeyConditionExpression : 'yearkey = :hkey and title = :rkey',
    FilterExpression : '#userKey1.#userKey2 = :userVal',
    ExpressionAttributeNames : {
		'#userKey1' : 'user_json',
		'#userKey2' : 'profile.title'
	},
	ExpressionAttributeValues : {
		':hkey' : year_val,
		':rkey' : title,
        ':userVal' :  'abc'
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