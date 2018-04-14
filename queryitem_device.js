var AWS = require("aws-sdk");

var creds = new AWS.Credentials('akid', 'secret', 'session');

AWS.config.update({
    region: "us-west-2",
    endpoint: "http://localhost:8000",
    credentials: creds
});

var docClient = new AWS.DynamoDB.DocumentClient();

var table = "device";


/*var params = {
    TableName: table,
    KeyConditionExpression: "#id = :dddd and #tm between :time1 and :time2",
    FilterExpression: "contains (#data, :ep)",
    ExpressionAttributeNames: {
        "#id": "deviceid",
        "#tm": "datetime",
        "#data" : "data"
    },
    ExpressionAttributeValues: {
        ":dddd": "1",
        ":time1": "2017-08-22T00:44:11:424Z",
        ":time2": "2017-08-22T23:44:11:424Z",
        ":ep": {
            "endpoint": 1,
            "value": "23"
        }
    }
};*/

var params = {
    TableName: table,
    KeyConditionExpression: "#id = :dddd and #tm between :time1 and :time2",
    FilterExpression: "#data"+"[0].endpoint = :ep",
    ExpressionAttributeNames: {
        "#id": "deviceid",
        "#tm": "datetime",
        "#data" : "data"
    },
    ExpressionAttributeValues: {
        ":dddd": "1",
        ":time1": "2017-08-22T00:44:11:424Z",
        ":time2": "2017-08-22T23:44:11:424Z",
        ":ep": 1
    }
};

docClient.query(params, function (err, data) {
    if (err) {
        console.error("Unable to read item. Error JSON:", JSON.stringify(err,
            null, 2));
    } else {
        console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
    }
});