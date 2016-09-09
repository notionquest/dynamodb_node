var AWS = require("aws-sdk");
var creds = new AWS.Credentials('akid', 'secret', 'session');

AWS.config.update({
	region : "us-west-2",
	endpoint : "http://localhost:8000",
	credentials : creds
});

var docClient = new AWS.DynamoDB.DocumentClient();

/*var params = {
	TableName : "Product",
	Key : {
		"product" : "IPhone 6+"
	},
	UpdateExpression : "REMOVE media :mediadata",
	ExpressionAttributeValues : {
		":mediadata" : {
			media : [ {

				id : "1",
				type : "image",
				url : "http://www.apple.com/iphone-6-plus/a.jpg"

			} ]
		}
	},
	ReturnValues : "UPDATED_NEW"
};*/


//Removing an item from List document type. Can't remove it based on some where condition 
/*var params = {
		TableName : "Product",
		Key : {
			"product" : "IPhone 7+"
		},
		UpdateExpression : "REMOVE media",	
		//UpdateExpression : "SET media[2].newurl = :urlvalue",
		ConditionExpression: "media.id = :idvalue",
		ExpressionAttributeNames: {
			"#mediaurl" : "media[2]"
		},
		ExpressionAttributeValues: {":idvalue" : "3"//,
			//":urlvalue" : "www.yahoo.com"
				},
		ReturnValues : "UPDATED_NEW"
	};*/

var params = {
		TableName : "Product",
		Key : {
			"product" : "IPhone 7+"
		},
		UpdateExpression : "REMOVE media[2]",	
		ConditionExpression: "media[2].id = :idvalue",		
		ExpressionAttributeValues: {":idvalue" : "3",
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