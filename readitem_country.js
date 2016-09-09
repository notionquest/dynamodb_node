var AWS = require("aws-sdk");
var DOC = require("dynamodb-doc");

AWS.config.update({
    region: "us-west-2",
    endpoint: "http://localhost:8000"
});

var docClient = new AWS.DynamoDB.DocumentClient();

var params = {
    TableName: "country",
    ProjectionExpression: "countryid, state_info.state_id, state_info.state_name",
    //FilterExpression: "#state_id = :state_id",
    FilterExpression: "contains (#state_name, :state_name)",
    ExpressionAttributeNames: {
        //"#state_id": "state_info.state_id"
        "#state_name": "state_info.state_name"
    },
    ExpressionAttributeValues: {
         //":state_id": 1111
    	":state_name": "TAMILNADU"
    }
};

console.log("Scanning Country table.");
docClient.scan(params, onScan);

function onScan(err, data) {
    if (err) {
        console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        // print all the movies
        console.log("Scan succeeded.");
        console.log(JSON.stringify(data));
        data.Items.forEach(function(country) {
           console.log(
        		country.countryid + ": ",
                country.state_info.state_id, country.state_info.state_name);
        });

        // continue scanning if we have more movies
        if (typeof data.LastEvaluatedKey != "undefined") {
            console.log("Scanning for more...");
            params.ExclusiveStartKey = data.LastEvaluatedKey;
            docClient.scan(params, onScan);
        }
    }
}