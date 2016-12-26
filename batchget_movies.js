var AWS = require("aws-sdk");

var creds = new AWS.Credentials('akid', 'secret', 'session');

AWS.config.update({
	region : "us-west-2",
	endpoint : "http://localhost:8000",
	credentials : creds
});

var docClient = new AWS.DynamoDB.DocumentClient();

var table = "Movies";

var year_val = 2015;
var title = "The Big New Movie";

var params = {
	"RequestItems" : {
		"Movies" : {
			"Keys" : [ {
				"yearkey" : 2016,
				"title" : "The Big New Movie 1"
			} ]
		}
	},
	"ReturnConsumedCapacity" : "TOTAL"
};

docClient.batchGet(params, function(err, data) {
	if (err) {
		console.error("Unable to read item. Error JSON:", JSON.stringify(err,
				null, 2));
	} else {
		console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
	}
});