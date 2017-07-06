var AWS = require("aws-sdk");

AWS.config.update({
    region: "us-west-2",
    endpoint: "http://localhost:8000"
});

var docClient = new AWS.DynamoDB.DocumentClient();

var table = "testcase";

var words = {
    "the": 1,
    "quick": 1,
    "brown": 4,
    "fox": 4,
    "jump": 1,
    "over": 6,
    "the": 1,
    "lazy": 3,
    "dog": 5
};

var params = {
    TableName: table,
    Item: {
        "name": 'testcase 1',
        "words": words
    }
};

console.log("Adding a new item...");
docClient.put(params, function (err, data) {
    if (err) {
        console.error("Unable to add item. Error JSON:", JSON.stringify(err,
            null, 2));
    } else {
        console.log("Added item:", JSON.stringify(data, null, 2));
    }
});