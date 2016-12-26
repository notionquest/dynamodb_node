var AWS = require("aws-sdk");
var creds = new AWS.Credentials('akid', 'secret', 'session');

AWS.config.update({
	region : "us-west-2",
	endpoint : "http://localhost:8000",
	credentials : creds
});

var docClient = new AWS.DynamoDB.DocumentClient();

var params = {
		TableName : "Movies",
		Key : {
			"yearkey" : 2010,
			"title" : "The Big New Movie 2010"
		},
		UpdateExpression : "  SET createdate = :createdate",			
		 ExpressionAttributeValues: {
			 	':createdate': '2010-12-21T17:42:34Z',
		        //':createdate': '2010-12-21T17:42:34+00:00',
			 	//':createdate': '20101112T162829Z', not working
		    },
		ReturnValues : "UPDATED_NEW"
	};

console.log("Updating the item...");
docClient.update(params, function(err, data) {
	if (err) {
		console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
	} else {
		console.log("UpdateItem succeeded:", JSON.stringify(data));
	}
});