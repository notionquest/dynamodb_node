var AWS = require("aws-sdk");
var creds = new AWS.Credentials('akid', 'secret', 'session');

AWS.config.update({
    region: "us-west-2",
    endpoint: "http://localhost:8000",
    credentials: creds
});

var emailVal = "zzz1@gmail.com";
var arbitraryValue = 1;

var docClient = new AWS.DynamoDB.DocumentClient();
var params = {
    TableName: "users",
    Key: {
        "email": emailVal
    },
   UpdateExpression: 'set #approved = :approved',
    ExpressionAttributeNames: {
        '#score' : 'score',
        '#approved' : 'approved'
    },
    ExpressionAttributeValues: {
        ':approved': '#score >= :threshold',
        ':threshold': arbitraryValue
    },
    ReturnValues:'ALL_NEW'
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