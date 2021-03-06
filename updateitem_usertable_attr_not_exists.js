var AWS = require("aws-sdk");
var creds = new AWS.Credentials('akid', 'secret', 'session');

AWS.config.update({
    region: "us-west-2",
    endpoint: "http://localhost:8000",
    credentials: creds
});

var userId = "hobb";

var docClient = new AWS.DynamoDB.DocumentClient();
var params = {
    TableName: "usertable",
    Key: {
        "userid": userId,
        "score": 500
    },
    //UpdateExpression: "SET  #extra.#someprop = :val2",
    UpdateExpression: "SET  #extrasomeprop = :val2",
    ExpressionAttributeNames: {
        //"#extra": "extra",
        "#extrasomeprop": "extra" + "." + "someprop"
    },
    ExpressionAttributeValues: {
        //":val1": {},
        ":val2": "helloworld"
    },
    ReturnValues: 'ALL_NEW'
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