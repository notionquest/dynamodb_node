var AWS = require("aws-sdk");

var creds = new AWS.Credentials('akid', 'secret', 'session');

AWS.config.update({
	region : "us-west-2",
	endpoint : "http://localhost:8000",
	credentials : creds
});

var docClient = new AWS.DynamoDB.DocumentClient();

var table = "Movies";

var year_val = 1991;
//var title = "The Big New Movie";
var title = "Movie with map attribute";

var params = {
	TableName : table,
	KeyConditionExpression : 'yearkey = :hkey and title = :rkey',
	FilterExpression : 'records.K1 = :recordsK1Value and records.K2 = :recordsK2Value',
	ProjectionExpression : 'records.K1, records.K2',
	/*ExpressionAttributeNames : {
		'#recordsK1' : 'records.K1'

	},*/
	ExpressionAttributeValues : {
		':hkey' : year_val,
		':rkey' : title,
		//":recordsK1Value" : {"S" : "V1"}
		":recordsK1Value" : "V1",
		":recordsK2Value" : "V2"
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