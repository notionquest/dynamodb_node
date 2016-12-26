var AWS = require("aws-sdk");

var creds = new AWS.Credentials('akid', 'secret', 'session');

AWS.config.update({
	region : "us-west-2",
	endpoint : "http://localhost:8000",
	credentials : creds
});

var docClient = new AWS.DynamoDB.DocumentClient();

var table = "Movies";

var productSet = docClient.createSet( ["veg", "milk"]);
var productArray = ['milk', 'veg'];

var params = {
	TableName : table,
	KeyConditionExpression : 'yearkey = :key1 AND title = :titleval',
	//FilterExpression: "product in (:productMilk, :productVeg )",
	//FilterExpression: " product in (:productSet) ",
	FilterExpression: " product in (:productSet) ",
	/*ExpressionAttributeNames : {
		':yearKey' : 'year'

	},*/
	ExpressionAttributeValues : {
		':key1' : 2016,
		':titleval' :  "The Big New Movie 1",
		//If you change it to just milk or veg, it doesn't work. Dont know the reason.
		':productSet' : productSet
		//':productSet' : ["milk", "veg"]	-- NOT WORKING
		//':productList' : docClient.createSet(productArray)
		//':productList' : productArray.toString()
		//':productMilk' : 'milk',
		//':productVeg' :  'veg'
	}
};

/*var params = {
	    TableName: "Movies",    
	    //FilterExpression: "product IN (:productvalue)",
	    FilterExpression: "title IN (:productvalue, :productvalue1)",
	    ExpressionAttributeValues: {
	         //":productvalue": docClient.createSet(["The Big New Movie 2012"]),
	    	":productvalue": "The Big New Movie 2012",
	    	":productvalue1": "The Big New Movie",
	    	//":productvalue": "The Big New Movie 2012",
	    }
	}; */

console.log(params);
docClient.query(params, function(err, data) {
	if (err) {
		console.error("Unable to read item. Error JSON:", JSON.stringify(err,
				null, 2));
	} else {
		console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
	}
});