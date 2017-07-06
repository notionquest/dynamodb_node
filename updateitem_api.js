var AWS = require("aws-sdk");

AWS.config.update({
    region: "us-west-2",
    endpoint: "http://localhost:8000"
});

var docClient = new AWS.DynamoDB.DocumentClient();

var table = "api";

var params = {
    TableName: table,
    Key: { _partition_id: 'User', _item_id: 'fvmSaEmEIW1' },
    ReturnValues: 'ALL_NEW',
    ExpressionAttributeNames:
    {
        '#updated_at': '_updated_at',
        '#hashed_password': '_hashed_password'
    },
    ExpressionAttributeValues:
    {
        ':H4GFZ': '2017-06-14T08:54:43.905Z',
        ':myKOH': 'xxxxx'
    },
    UpdateExpression: 'SET #updated_at = :H4GFZ, #hashed_password = :myKOH'
};

console.log("Updated an item...");
docClient.update(params, function (err, data) {
    if (err) {
        console.error("Unable to update item. Error JSON:", JSON.stringify(err,
            null, 2));
    } else {
        console.log("Updated item:", JSON.stringify(data, null, 2));
    }
});