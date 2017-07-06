var AWS = require("aws-sdk");
var creds = new AWS.Credentials('akid', 'secret', 'session');

AWS.config.update({
    region: "us-west-2",
    endpoint: "http://localhost:8000",
    credentials: creds
});

var tableName = "serial";
var serialNumber = 1;
var newCommsId = "234";

var docClient = new AWS.DynamoDB.DocumentClient();
var params = {
    TableName: tableName,
    Key: {
        "deviceSerialId": serialNumber
    },
    UpdateExpression: "SET commsId = :commsIdVal",
    ConditionExpression: "deviceSerialId = :deviceSerialIdVal and commsId <> :commsIdVal",
    ExpressionAttributeValues: {    
        ":deviceSerialIdVal" : serialNumber,           
        ":commsIdVal": newCommsId
    },
    ReturnValues: "ALL_NEW"
}; 

console.log("Updating the item...");
docClient.update(params, function (err, data) {
    if (err) {
        console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("UpdateItem succeeded:", JSON.stringify(data));
        console.log("Metrics :", JSON.stringify(data.ItemCollectionMetrics));
    }
});