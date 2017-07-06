var AWS = require("aws-sdk");
var creds = new AWS.Credentials('akid', 'secret', 'session');

AWS.config.update({
    region: "us-west-2",
    endpoint: "http://localhost:8000",
    credentials: creds
});

var docClient = new AWS.DynamoDB.DocumentClient();

var table = "post";


var params = {
    TableName: table,
    Item: {
        "postId": '6',
        "forms": {
            "f788": {
                "id": "f788",
                "is_deleted": 0,
                "title": "Form 11"
            },
            "f6yy": {
                "id": "f6yy",
                "is_deleted": 0,
                "title": "Form 12"
            },
            "f00i": {
                "id": "f00i",
                "is_deleted": 0,
                "title": "Form 13"
            }
        }
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