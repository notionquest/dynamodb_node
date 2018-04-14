var AWS = require("aws-sdk");
var creds = new AWS.Credentials('akid', 'secret', 'session');

AWS.config.update({
    region: "us-west-2",
    endpoint: "http://localhost:8000",
    credentials: creds
});

var docClient = new AWS.DynamoDB.DocumentClient();

var params = {
    TableName: "users",
    FilterExpression: "purchasedDate between :fromDate and :toDate",
    ExpressionAttributeValues: {
        ":fromDate": "11-01-2017 00:00:00",
        ":toDate": "10-02-2017 00:00:00"
    }
};

docClient.scan(params, onScan);
var count = 0;

function onScan(err, data) {
    if (err) {
        console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Scan succeeded.");
        data.Items.forEach(function (itemdata) {
            console.log("Item :", ++count, JSON.stringify(itemdata));
        });

        // continue scanning if we have more items
        if (typeof data.LastEvaluatedKey != "undefined") {
            console.log("Scanning for more...");
            params.ExclusiveStartKey = data.LastEvaluatedKey;
            docClient.scan(params, onScan);
        }
    }
}