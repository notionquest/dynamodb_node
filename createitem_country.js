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
	    "state_info":  [ 
	      
	         {
	          "state_id":1111,
	          "state_name":"TAMILNADU"
	         },
	         {
	          "state_id":2222,
	          "state_name":"KERALA"
	         },
	         {
	          "state_id":3333,
	          "state_name":"PUNJAB"
	         }
	    ] 
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