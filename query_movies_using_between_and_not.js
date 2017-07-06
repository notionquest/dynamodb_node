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
var title = "The Big New Movie 2017";


var params = {
	TableName : table,
	KeyConditionExpression : 'yearkey = :hkey and title = :rkey',
	//FilterExpression : '(createdate between :val1 and :val2) and (createdby <> :createdByVal)',
    FilterExpression : '(createdate between :val1 and :val2) and (createdby <> :createdByVal1 and createdby <> :createdByVal2)',
    //FilterExpression : 'createdby <> :createdByVal',
	ExpressionAttributeValues : {
		':hkey' : year_val,
		':rkey' : title,
		":val1" : "2011-10-05",
		":val2" : "2017-01-24",
        ":createdByVal1" : ["john"],
        ":createdByVal2" : ["james"]
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