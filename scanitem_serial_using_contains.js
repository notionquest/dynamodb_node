var AWS = require("aws-sdk");
var creds = new AWS.Credentials('akid', 'secret', 'session');

AWS.config.update({
    region: "us-west-2",
    endpoint: "http://localhost:8000",
    credentials: creds
});

var docClient = new AWS.DynamoDB.DocumentClient();

var params = {
    TableName: "serial",
    FilterExpression: "contains (clustermembers, :clustermembersVal)",
    ExpressionAttributeValues: {
        ":clustermembersVal": {
            "email": "teste@teste.com",
            "role": "ADMIN",
            "id": "4bbe0f00-67c3-11e7-a6be-b9c9fc540ac2"
        }
    }
};

docClient.scan(params, onScan);

function onScan(err, data) {
    if (err) {
        console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Scan succeeded.");
        data.Items.forEach(function (printItem) {
            console.log("Item :", JSON.stringify(printItem));
        });
        
        if (typeof data.LastEvaluatedKey != "undefined") {
            console.log("Scanning for more...");
            params.ExclusiveStartKey = data.LastEvaluatedKey;
            docClient.scan(params, onScan);
        }
    }
}