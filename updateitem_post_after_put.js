var AWS = require("aws-sdk");
var creds = new AWS.Credentials('akid', 'secret', 'session');

AWS.config.update({
    region: "us-west-2",
    endpoint: "http://localhost:8000",
    credentials: creds
});

var docClient = new AWS.DynamoDB.DocumentClient();

var table = "post";

var paramsPut = {
    TableName: table,
    Item: {
        "postId": '16',
        "Pos": {
            "key": "1a", "a": "1"
        }
    }
};

var paramsUpdate = {
    TableName: "post",
    Key: {
        "postId": "16"
    },
    UpdateExpression: "SET Pos.#key = :keyVal, Pos.b = :keyVal2",
    ExpressionAttributeNames: {
        "#key": "key"
    },
    ExpressionAttributeValues: {
        ":keyVal": "1",
        ":keyVal2": "2"
    },
    ReturnValues: "ALL_NEW"
};

console.log("Adding a new item...");
docClient.put(paramsPut, function (err, data) {
    if (err) {
        console.error("Unable to add item. Error JSON:", JSON.stringify(err,
            null, 2));
    } else {
        console.log("Added item:", JSON.stringify(data, null, 2));

        console.log("Then Updating the item...");
        docClient.update(paramsUpdate, function (err, data) {
            if (err) {
                console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
            } else {
                console.log("UpdateItem succeeded:", JSON.stringify(data));
            }
        });
    }
});