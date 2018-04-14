var AWS = require("aws-sdk");
var creds = new AWS.Credentials('akid', 'secret', 'session');

AWS.config.update({
    region: "us-west-2",
    endpoint: "http://localhost:8000",
    credentials: creds
});

var docClient = new AWS.DynamoDB.DocumentClient();

var params = {
    TableName: "table4",
    FilterExpression: "userid = :user_id1 AND (userid = :user_id2 AND ts > :et1 AND ts < :et2)",
    ExpressionAttributeValues: { ":user_id1": 'ME 21',
        ":user_id2": 'ME 21',
        ":et1" : 1509267216,
        ":et2" : 1509353618,
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