var AWS = require("aws-sdk");
var creds = new AWS.Credentials('akid', 'secret', 'session');

AWS.config.update({
    region: "us-west-2",
    endpoint: "http://localhost:8000",
    credentials: creds
});

var docClient = new AWS.DynamoDB.DocumentClient();

var askedCount =3;

var params = {
    TableName: "stock",
    Key: {
        "ID": '3'
    },
    UpdateExpression: "SET UsageCount = UsageCount + :askedCount",
    ConditionExpression : "(UsageCount = UsageCount " + askedCount + " < EntitilementCount",
    //ConditionExpression : "UsageCount < EntitilementCount",
    ExpressionAttributeValues: {
        ":askedCount": askedCount,
    },
    ReturnValues: "UPDATED_NEW"
};

console.log("Updating the item...");
docClient.update(params, function (err, data) {
    if (err) {
        console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("UpdateItem succeeded:", JSON.stringify(data));
    }
});