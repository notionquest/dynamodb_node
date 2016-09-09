var AWS = require("aws-sdk");
var creds = new AWS.Credentials('akid', 'secret', 'session');

AWS.config.update({
    region: "us-west-2",
    endpoint: "http://localhost:8000",
	credentials : creds
});

var docClient = new AWS.DynamoDB.DocumentClient();

//Scanning the item of type 'SS' using IN 
/*var params = {
    TableName: "Movies",    
    FilterExpression: "product IN (:productvalue)",
    ExpressionAttributeValues: {
         ":productvalue": docClient.createSet(["milk", "veg"]),
    }
};*/
var params = {
    TableName: "Movies",    
    FilterExpression: "title = :title1 OR title = :title2",
    ExpressionAttributeValues: {
         ":title1": "The Big New Movie 1",
		 ":title2": "The Big New Movie 2",
    }
};

console.log("Scanning Movies table.");
docClient.scan(params, onScan);

function onScan(err, data) {
    if (err) {
        console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
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