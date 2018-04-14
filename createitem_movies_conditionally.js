var AWS = require("aws-sdk");

AWS.config.update({
	region : "us-west-2",
	endpoint : "http://localhost:8000"
});

var docClient = new AWS.DynamoDB.DocumentClient();

var table = "Movies";

var year = 1990;
var title = "Movie with list of strings using var 3";

var params = {
    TableName:table,
    Item:{
        "yearkey": year,
        "title": title      
    },    
    ConditionExpression : "yearkey <> :yearVal AND title <> :titleVal",
	ExpressionAttributeValues : {
        ":yearVal" : year,
        ":titleVal" : title,
	}
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