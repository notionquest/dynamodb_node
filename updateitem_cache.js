var AWS = require("aws-sdk");

AWS.config.update({
    region: "us-west-2",
    endpoint: "http://localhost:8000"
});

var docClient = new AWS.DynamoDB.DocumentClient();

var table = "cache";

var params = {
    TableName: table,
    Key: { 
        "storage_CACHE_KEY" : "1",
     },
    ReturnValues: 'ALL_NEW',    
    /* ExpressionAttributeValues:
    {
        ':resultVal': [3.8]
    }, */
    UpdateExpression: 'REMOVE GSRResults[0]'
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