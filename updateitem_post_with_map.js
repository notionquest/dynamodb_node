var AWS = require("aws-sdk");
var creds = new AWS.Credentials('akid', 'secret', 'session');

AWS.config.update({
    region: "us-west-2",
    endpoint: "http://localhost:8000",
    credentials: creds
});

var docClient = new AWS.DynamoDB.DocumentClient();

var params = {
    TableName: "post",
    Key: {
        "postId": "15"
    },
    UpdateExpression: "SET Pos.#key = :keyVal, Pos.b = :keyVal2",
    ExpressionAttributeNames: {
        "#key" : "key"
    },
    ExpressionAttributeValues: {
        ":keyVal": "1",
        ":keyVal2": "2"
    },
    ReturnValues: "ALL_NEW"
};

console.log("Updating the item...");
docClient.update(params, function (err, data) {
    if (err) {
        console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("UpdateItem succeeded:", JSON.stringify(data));
    }
});