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
        '#approved' : 'approved'
    },
    ExpressionAttributeValues: {
        ':approved': false
    },
    ReturnValues:'ALL_NEW'
};

console.log("Updating the item...");
requestObj = docClient.update(params);
requestObj.send();