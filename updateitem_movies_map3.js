var AWS = require("aws-sdk");
var creds = new AWS.Credentials('akid', 'secret', 'session');

AWS.config.update({
	region : "us-west-2",
	endpoint : "http://localhost:8000",
	credentials : creds
});

var docClient = new AWS.DynamoDB.DocumentClient();
var categoryList = [{"subkey1":"value1"}, {"subkey2" : "value2"}];

/*var params = {
		TableName : "Movies",
		Key : {
			"yearkey" : 2016,
			"title" : "The Big New Movie 1"
		},
		UpdateExpression : "set #3 = :emptyMap",
		ExpressionAttributeNames: {
			'#3' : 'category111'
		},
        ExpressionAttributeValues: {':emptyMap' : {}},
        ConditionExpression: 'attribute_not_exists(#3)',
		ReturnValues: 'UPDATED_NEW'
};*/
    const params = {
        TableName : "Movies",
        Key: {
            "yearkey" : 2016,
			"title" : "The Big New Movie 1"
        },
        ExpressionAttributeNames: {
          '#3': 'data'
        },
        ExpressionAttributeValues: {
          ':emptyMap': {}
        },
        UpdateExpression: 'SET #3 = :emptyMap',
        ConditionExpression: 'attribute_not_exists(#3)'
      };    

console.log("Updating the item...");
docClient.update(params, function(err, data) {
	if (err) {
		console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
	} else {
		console.log("UpdateItem succeeded:", JSON.stringify(data));
	}
});