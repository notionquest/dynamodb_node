var AWS = require("aws-sdk");

AWS.config.update({
	region : "us-west-2",
	endpoint : "http://localhost:8000"
});

var docClient = new AWS.DynamoDB.DocumentClient();

var table = "Trail";

var params = {
	TableName : table,
	Item : {
		"facebook_id" : 3,
		//"latitude" : 'lat2',
		"longitude" : 'long',
		"name" : 'facebook',
		"category" : 'social_media'
	},
	ConditionExpression : "facebook_id = :facebook_id",
	ExpressionAttributeValues : {
		":facebook_id" : 2
	}
	/*ConditionExpression : "latitude <> :latitudeValue",
	ExpressionAttributeValues : {
		":latitudeValue" : "lat1"
	}*/

};

console.log("Adding a new item conditionally...");
docClient.put(params, function(err, data) {
	if (err) {
		console.error("Unable to add item. Error JSON:", JSON.stringify(err,
				null, 2));
	} else {
		console.log("Added item:", JSON.stringify(data, null, 2));
	}
});