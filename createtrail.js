var AWS = require("aws-sdk");

AWS.config.update({
	region : "us-west-2",
	endpoint : "http://localhost:8000"
});

var dynamodb = new AWS.DynamoDB();

var params = {
	TableName : "Trail",
	KeySchema : [ {
		AttributeName : "facebook_id",
		KeyType : "HASH"
	}, //Partition key
	{
		AttributeName : "latitude",
		KeyType : "RANGE"
	} //Sort key
	],
	AttributeDefinitions : [ {
		AttributeName : "facebook_id",
		AttributeType : "N"
	}, {
		AttributeName : "latitude",
		AttributeType : "S"
	} ],
	ProvisionedThroughput : {
		ReadCapacityUnits : 10,
		WriteCapacityUnits : 10
	}
};

dynamodb.createTable(params, function(err, data) {
	if (err) {
		if (err.code === "ResourceInUseException"
				&& err.message === "Cannot create preexisting table") {
			console.log("message ====>" + err.message);
		} else {
			console.error("Unable to create table. Error JSON:", JSON
					.stringify(err, null, 2));
		}

	} else {
		console.log("Created table. Table description JSON:", JSON.stringify(
				data, null, 2));
	}
});