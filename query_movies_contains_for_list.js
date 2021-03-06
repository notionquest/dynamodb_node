var AWS = require("aws-sdk");

var creds = new AWS.Credentials('akid', 'secret', 'session');

AWS.config.update({
	region : "us-west-2",
	endpoint : "http://localhost:8000",
	credentials : creds
});

var docClient = new AWS.DynamoDB.DocumentClient();

var table = "Movies";

var childrenTina = {"name":"Tina"};
var childrenLouise = {"name":"Louise"};

var params = {
	TableName : table,
	KeyConditionExpression : 'yearkey = :key1 AND title = :titleval',
	FilterExpression: "  contains (children, :childrenTina) AND contains (children, :childrenLouise)   ",
	ExpressionAttributeValues : {
		':key1' : 2016,
		':titleval' :  "The Big New Movie 1",
		':childrenTina' : childrenTina,
		':childrenLouise' : childrenLouise
		
	}
};

//console.log(params);
docClient.query(params, function(err, data) {
	if (err) {
		console.error("Unable to read item. Error JSON:", JSON.stringify(err,
				null, 2));
	} else {
		console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
	}
});