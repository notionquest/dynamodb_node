var AWS = require("aws-sdk");

AWS.config.update({
    region: "us-west-2",
    endpoint: "http://localhost:8000"
});

var docClient = new AWS.DynamoDB.DocumentClient();

var table = "eventtype";

var year = 2015;
var title = "The Big New Movie";

var params = {
    TableName: table,
    Item: {
        'EventType': 'git/push',
        'EventTime': 1416251010,
        'Commits': [
            {
                'id': '29d02aff',
                'subject': 'Add the thing to the place'
            },
            {
                'id': '9d888fec',
                'subject': 'Spelling errors'
            },

        ]
    }
};

console.log("Adding a new item...");
docClient.put(params, function (err, data) {
    if (err) {
        console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Added item:", JSON.stringify(data, null, 2));
    }
});