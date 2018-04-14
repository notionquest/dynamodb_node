var AWS = require("aws-sdk");
var creds = new AWS.Credentials('akid', 'secret', 'session');

AWS.config.update({
    region: "us-west-2",
    endpoint: "http://localhost:8000",
    credentials: creds
});

var dynamoDB = new AWS.DynamoDB;

var table = "post";

var params = {
    TableName: table,
    Item: {
        "postId": {
            S: "14"
        },
        "Session": {
            S: "b6ba8b6d-ce27-4585-aee5-b9a2393e54da"
        },
        "Pos": {
            M: {
                "X": {
                    S: "-16.8"
                },
                "Y": {
                    S: "-4.492812"
                }
            }
        },
        "Time": {
            S: "7/27/2017 3:21:25 PM"
        }
    }
};

console.log("Adding a new item...");
dynamoDB.putItem(params, function (err, data) {
    if (err) {
        console.error("Unable to add item. Error JSON:", JSON.stringify(err,
            null, 2));
    } else {
        console.log("Added item:", JSON.stringify(data, null, 2));
    }
});