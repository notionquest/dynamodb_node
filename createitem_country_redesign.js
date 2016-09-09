var AWS = require("aws-sdk");

AWS.config.update({
	region : "us-west-2",
	endpoint : "http://localhost:8000"
});

var docClient = new AWS.DynamoDB.DocumentClient();

var table = "country";

var ts = null;

var params = {
	TableName : table,
	Item : {
	    "countryid":"c8e3dcc34ec14c6f82b81111",
	    "country_name":"India",
	    "country_code":"IN",
	    "1111":  "TAMILNADU",
	    "2222" : "KERALA",
	    "3333" : "PUNJAB"	         
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