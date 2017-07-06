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

async function getMovieJson() {
    var params = {
        TableName: table,
        KeyConditionExpression: 'yearkey = :hkey and title = :rkey',
        ExpressionAttributeValues: {
            ':hkey': year_val,
            ':rkey': title
        }
    };

    return await docClient.query(params);
}

console.log(getMovieJson());
console.log("End of code");