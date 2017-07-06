var AWS = require("aws-sdk");

var creds = new AWS.Credentials('akid', 'secret', 'session');

AWS.config.update({
    region: "us-west-2",
    endpoint: "http://localhost:8000",
    credentials: creds
});

var docClient = new AWS.DynamoDB.DocumentClient();

var table = "users";


var queryParams = {
    TableName: "users",
    KeyConditionExpression: "email = :user",
    ExpressionAttributeValues: {
        ":user": "zzz@gmail.com"
    }
};

docClient.query(queryParams,
    function (err, user) {
        if (err) {
            
            console.error(err);
            
        } else {
            console.log(user);
        }
    });

/*docClient.query(params, function (err, data) {
    if (err) {
        console.error("Unable to read item. Error JSON:", JSON.stringify(err,
            null, 2));
    } else {
        console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
    }
});*/