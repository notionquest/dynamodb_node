var AWS = require("aws-sdk");

var creds = new AWS.Credentials('akid', 'secret', 'session');

AWS.config.update({
    region: "us-west-2",
    endpoint: "http://localhost:8000",
    credentials: creds
});

var docClient = new AWS.DynamoDB.DocumentClient();

var timeInMs = Date.now();

var params = {
    RequestItems: {
        "subscription": [
            {
                PutRequest: {
                    Item: {
                        "emailId": "abc1@abc1.com",
                        "subscriptionId": "A1"
                    }
                }
            },
            {
                PutRequest: {
                    Item: {
                        "emailId": "abc2@abc2.com",
                        "subscriptionId": "A2"
                    }
                }
            },
            {
                PutRequest: {
                    Item: {
                        "emailId": "abc3@abc3.com",
                        "subscriptionId": "A3"
                    }
                }
            }
        ]
    }
};

docClient.batchWrite(params, function (err, data) {
    if (err) {
        console.error("Unable to write item. Error JSON:", JSON.stringify(err,
            null, 2));
    } else {
        console.log("Write Item succeeded:", JSON.stringify(data, null, 2));
    }
});