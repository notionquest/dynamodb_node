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
        "Movies": [
            {
                PutRequest: {
                    Item: {
                        "title": "The Big New Movie",
                        "yearkey": 1500,
                        "rating": "3"
                    }
                }
            },        
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