var AWS = require("aws-sdk");

var creds = new AWS.Credentials('akid', 'secret', 'session');

AWS.config.update({
	region : "us-west-2",
	endpoint : "http://localhost:8000",
	credentials : creds
});

var docClient = new AWS.DynamoDB.DocumentClient();

var table = "post";

var params = {
	TableName : table,
	KeyConditionExpression : 'postId = :postIdval',	
    FilterExpression : '#name= :nameVal and age= :ageVal and active=:activeVal and area=:areaVal',
     ExpressionAttributeNames : {
		'#name' : 'name'
	},
	ExpressionAttributeValues : {
		':postIdval' : '7',
		':nameVal' : 'this',
        ':ageVal' : 22,
        ':activeVal' : 'this',
        ':areaVal' : 'this'
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