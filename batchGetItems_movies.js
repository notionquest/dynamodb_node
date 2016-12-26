var AWS = require("aws-sdk");

var creds = new AWS.Credentials('akid', 'secret', 'session');

AWS.config.update({
	region : "us-west-2",
	endpoint : "http://localhost:8000",
	credentials : creds
});

var dynamodb = new AWS.DynamoDB();

var table = "Movies";

var year_val = 2015;
var title = "The Big New Movie";

var params = {
	"RequestItems" : {
		"Movies" : {
			"Keys" : [ {
				"yearkey" : {N : "2016"},
				"title" : {S : "The Big New Movie 1"}
			} ]
		}
	},
	"ReturnConsumedCapacity" : "TOTAL"
};

dynamodb.batchGetItem(params, function(err, data) {
	if (err) {
		console.error("Unable to read item. Error JSON:", JSON.stringify(err,
				null, 2));
	} else {
		console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
	}
});