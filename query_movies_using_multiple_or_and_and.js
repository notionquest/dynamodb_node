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
var title = "Movie with map attribute";

var params = {
	TableName : table,
	KeyConditionExpression : 'yearkey = :hkey and title = :rkey',
	FilterExpression : '(records.K1 = :k1Val AND records.K2 = :k2Val) OR (records.K3 = :k3Val AND records.K4 = :k4Val)',    
	ExpressionAttributeValues : {
		':hkey' : year_val,
		':rkey' : title,
        ':k3Val' : 'V3',
        ':k4Val' : 'V4',        
        ':k1Val' : 'V1',
        ':k2Val' : 'V2'
		
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