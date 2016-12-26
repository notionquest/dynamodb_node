var AWS = require("aws-sdk");

var creds = new AWS.Credentials('akid', 'secret', 'session');

AWS.config.update({
	region : "us-west-2",
	endpoint : "http://localhost:8000",
	credentials : creds
});

var docClient = new AWS.DynamoDB.DocumentClient();

var table = "Movies";

var year_val = 1992;
var title = "Movie with list attribute";

var params = {
	TableName : table,
	KeyConditionExpression : 'yearkey = :hkey and title = :rkey',
	FilterExpression : 'contains (records, :recordsK1Value)',
	ProjectionExpression : 'records[0], records[1]',
	/*ExpressionAttributeNames : {
		'#recordsK1' : 'records.K1'

	},*/
	ExpressionAttributeValues : {
		':hkey' : year_val,
		':rkey' : title,
		":recordsK1Value" : "K1",
	}
};

docClient.query(params, function(err, data) {
	if (err) {
		console.error("Unable to read item. Error JSON:", JSON.stringify(err,
				null, 2));
	} else {
		console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
		console.log ("Length of the list :",  data.Items[0].records.length);
		data.Items.forEach(function(itemValue) {
			console.log ("Last element in the array :",itemValue.records[itemValue.records.length - 1]);
		});		
	}
});