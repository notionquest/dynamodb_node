var AWS = require("aws-sdk");
var creds = new AWS.Credentials('akid', 'secret', 'session');

AWS.config.update({
	region : "us-west-2",
	endpoint : "http://localhost:8000",
	credentials : creds
});

var docClient = new AWS.DynamoDB.DocumentClient();

var hashKey = 2012;

var paramsQuery = {
	TableName : "Movies",
	KeyConditionExpression : 'yearkey = :hkey',
	ExpressionAttributeValues : {
		':hkey' : hashKey

	}
};

function updateItem(paramsUpdate) {
	console.log("Updating the item...");
	docClient.update(paramsUpdate, function(err, data) {
		if (err) {
			console.error("Unable to update item. Error JSON:", JSON.stringify(
					err, null, 2));
		} else {
			console.log("UpdateItem succeeded:", JSON.stringify(data));
		}
	});
}

docClient.query(paramsQuery, function(err, data) {
	if (err) {
		console.error("Unable to read item. Error JSON:", JSON.stringify(err,
				null, 2));
	} else {
		console.log(data.Count);
		var itemIndex = 0;
		while (itemIndex < data.Count) {

			console.log('Hashkey to be updated ======>',
					 data.Items[itemIndex].yearkey,
					 ';Title to be updated ========>',
					 data.Items[itemIndex].title);
			var paramsUpdate = {
				TableName : "Movies",
				Key : {
					"yearkey" : data.Items[itemIndex].yearkey,
					"title" : data.Items[itemIndex].title
				},
				UpdateExpression : "set #createdate = :createdate",
				ExpressionAttributeNames : {
					'#createdate' : 'createdate'
				},
				ExpressionAttributeValues : {
					':createdate' : '2016-11-17'
				},
				ReturnValues : 'UPDATED_NEW'
			};
			updateItem(paramsUpdate);
			itemIndex++;

		}
	}
});
