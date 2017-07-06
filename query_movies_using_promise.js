var AWS = require("aws-sdk");

var creds = new AWS.Credentials('akid', 'secret', 'session');

AWS.config.update({
    region: "us-west-2",
    endpoint: "http://localhost:8000",
    credentials: creds
});

var docClient = new AWS.DynamoDB.DocumentClient();

var table = "Movies";

var year_val = 1992;
var title = "Movie with list attribute";

var params = {
    TableName: table,
    KeyConditionExpression: 'yearkey = :hkey and title = :rkey',
    ExpressionAttributeValues: {
        ':hkey': year_val,
        ':rkey': title        
    }
};

var queryObjectPromise = docClient.query(params).promise();

queryObjectPromise.then(function (data) {
    console.log("Query Item succeeded: ", JSON.stringify(data,
        null, 2));
}).catch(function (err) {
    console.log("Unable to read item. Error JSON: ", JSON.stringify(err, null, 2));

});