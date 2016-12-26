var AWS = require("aws-sdk");
var creds = new AWS.Credentials('akid', 'secret', 'session');

AWS.config.update({
	region : "us-west-2",
	endpoint : "http://localhost:8000",
	credentials : creds
});

var docClient = new AWS.DynamoDB.DocumentClient();

var titleValues = ["The Big New Movie 2012", "The Big New Movie"];
var titleObject = {};
var index = 0;
titleValues.forEach(function(value) {
	index++;
	var titleKey = ":titlevalue"+index;
	titleObject[titleKey.toString()] = value;
});

console.log(titleObject.toString());

console.log(Object.keys(titleObject).toString());
var params = {
	TableName : "Movies",
	FilterExpression : "title IN ("+Object.keys(titleObject).toString()+ ")",
	ExpressionAttributeValues : titleObject
};

console.log("Scanning Movies table.");
docClient.scan(params, onScan);

function onScan(err, data) {
	if (err) {
		console.error("Unable to scan the table. Error JSON:", JSON.stringify(
				err, null, 2));
	} else {
		// print all the movies
		console.log("Scan succeeded.");
		data.Items.forEach(function(movie) {
			console.log("Item :", JSON.stringify(movie));
		});

		// continue scanning if we have more movies
		if (typeof data.LastEvaluatedKey != "undefined") {
			console.log("Scanning for more...");
			params.ExclusiveStartKey = data.LastEvaluatedKey;
			docClient.scan(params, onScan);
		}
	}
}