var AWS = require("aws-sdk");

AWS.config.update({
	region : "us-west-2",
	endpoint : "http://localhost:8000"
});

var docClient = new AWS.DynamoDB.DocumentClient();

var table = "post";

/*var params = {
	TableName : table,
	Item : {
		"postId" : '1',
		"tags" : ['A','B', 'C'],
        "text" : "Hello"
	}
};*/

/*var params = {
	TableName : table,
	Item : {
		"postId" : '2',
		"tags" : ['B', 'D'],
        "text" : "How are you?"
	}
};
*/
var params = {
	TableName : table,
	Item : {
		"postId" : '3',
		"tags" : ['A', 'C'],
        "text" : "Hello World"
	}
};

console.log("Adding a new item...");
docClient.put(params, function(err, data) {
	if (err) {
		console.error("Unable to add item. Error JSON:", JSON.stringify(err,
				null, 2));
	} else {
		console.log("Added item:", JSON.stringify(data, null, 2));
	}
});