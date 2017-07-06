var AWS = require("aws-sdk");

var creds = new AWS.Credentials('akid', 'secret', 'session');

AWS.config.update({
	region : "us-west-2",
	endpoint : "http://localhost:8000",
	credentials : creds
});

var docClient = new AWS.DynamoDB.DocumentClient();

var table = "learnerpal-units-dev";

var params = {
	TableName : table,
    IndexName : "unitOwnerIndexDev",
	KeyConditionExpression : 'ownerName= :hkey',
    FilterExpression : 'unitID = :unitIdVal',  
    /*Key:{"unitID": '1'
                },  */
	ExpressionAttributeValues : {
		':hkey' : 'owner1',
        ':unitIdVal' : '1'
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