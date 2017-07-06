var AWS = require("aws-sdk");

var creds = new AWS.Credentials('akid', 'secret', 'session');

AWS.config.update({
	region : "us-west-2",
	endpoint : "http://localhost:8000",
	credentials : creds
});

var docClient = new AWS.DynamoDB.DocumentClient();

var table = "Movies";

var year_val = 1990;
var title = "Movie with list with map attributes";

//not working
var params = {
	TableName : table,
	KeyConditionExpression : 'yearkey = :hkey and title = :rkey',
	FilterExpression : '#userId = :userId',	
    ExpressionAttributeNames : {
        '#userId' : 'users'+[0]+'.user_id'
    },
	ExpressionAttributeValues : {
		':hkey' : year_val,
		':rkey' : title,
        ':userId' : 'xxx'
		//":recordsK1Value" : "K1",
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