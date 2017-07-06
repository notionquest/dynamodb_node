var AWS = require("aws-sdk");
var creds = new AWS.Credentials('akid', 'secret', 'session');

AWS.config.update({
    region: "us-west-2",
    endpoint: "http://localhost:8000",
    credentials: creds
});

var tableName = "post";

var deviceID = 1;
var firmwareVersion = 1;
var productID = 1;

var deviceData = [{
    'deviceID': deviceID,
    'attributes': [
        { 'firmwareVersion': firmwareVersion },
        { 'productID': productID },
        { 'knickName': 'New Device' },
        { 'dateAdded': (new Date()).getTime() }
    ]
}];

var customerEmailDomain = "customerEmailDomain";
var friendlyName = "friendlyName";

var docClient = new AWS.DynamoDB.DocumentClient();
var params = {
    TableName: tableName,
    Key: {
        "postId": "10"
    },
    ReturnValues: 'UPDATED_NEW',
    UpdateExpression: 'SET #device = :device, #customerEmailDomain = :customerEmailDomain ,#friendlyName = :friendlyName, #created = :created, #updated = :updated',
    ExpressionAttributeNames: {
        '#device': 'deviceList',
        '#customerEmailDomain': 'customerEmaiDomain',
        '#friendlyName': 'friendlyName',
        '#created': 'createAccountTime',
        '#updated': 'updateAccountTime',
    },
    ExpressionAttributeValues: {
        ':device': deviceData,
        ':customerEmailDomain': customerEmailDomain,
        ':friendlyName': friendlyName,
        ':created': (new Date()).getTime(),
        ':updated': (new Date()).getTime()
    }
};

console.log("Updating the item...");
docClient.update(params, function (err, data) {
    if (err) {
        console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("UpdateItem succeeded:", JSON.stringify(data));
    }
});