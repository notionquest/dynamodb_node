var AWS = require("aws-sdk");
var creds = new AWS.Credentials('akid', 'secret', 'session');

AWS.config.update({
	region : "us-west-2",
	endpoint : "http://localhost:8000",
	credentials : creds
});

var docClient = new AWS.DynamoDB.DocumentClient();

/*
 * var params = { TableName : "Product", Key : { "product" : "IPhone 6+" },
 * UpdateExpression : "REMOVE media :mediadata", ExpressionAttributeValues : {
 * ":mediadata" : { media : [ {
 * 
 * id : "1", type : "image", url : "http://www.apple.com/iphone-6-plus/a.jpg" } ] } },
 * ReturnValues : "UPDATED_NEW" };
 */

var params = {
	Key : {
		product : {
			S : 'IPhone 6+'
		}
	},
	AttributeUpdates : {
		media : {
			Action : 'ADD',
			Value : {
				L : [ {

					id : "1",
					type : "image",
					url : "http://www.apple.com/iphone-6-plus/a.jpg"
				} ]

			}
		}
	},
	TableName : "Product",
	ReturnValues : 'ALL_NEW'
};

console.log("Updating the item...");
docClient.update(params, function(err, data) {
	if (err) {
		console.error("Unable to update item. Error JSON:", JSON.stringify(err,
				null, 2));
	} else {
		console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
	}
});