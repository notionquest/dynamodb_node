var AWS = require("aws-sdk");
var creds = new AWS.Credentials('akid', 'secret', 'session');

AWS.config.update({
	region : "us-west-2",
	endpoint : "http://localhost:8000",
	credentials : creds
});

var docClient = new AWS.DynamoDB.DocumentClient();

/*var params = {
		TableName : "Movies",
		Key : {
			"yearkey" : 2016,
			"title" : "The Big New Movie"
		},
		UpdateExpression : "ADD product :productvalue",			
		ExpressionAttributeValues: {":productvalue" :  {"SS": [ "vegetable"]}},
		ReturnValues : "UPDATED_NEW"
	};*/

var params = {
		TableName : "Movies",
		Key : {
			"yearkey" : 2014,
			"title" : "The Big New Movie 2"
		},
		UpdateExpression : "ADD past_visits :inc, past_chats :inc  SET reset_time = :value",			
		 ExpressionAttributeValues: {
		        ':inc': 1,
		        ':value': 0
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