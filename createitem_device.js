var AWS = require("aws-sdk");

AWS.config.update({
    region: "us-west-2",
    endpoint: "http://localhost:8000"
});

var docClient = new AWS.DynamoDB.DocumentClient();

var table = "device";



var params = {
    TableName: table,
    Item: {
        "deviceid": "1",
        "datetime": "2017-08-22T22:44:11:424Z",
        "data": [
            {
                "endpoint": 1,
                "value" : "23"                
            },
            {
                "endpoint": 2,
                "value" : "33"                
            },
            {
                "endpoint": 3,
                "value" : "26"                
            }
        ]
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