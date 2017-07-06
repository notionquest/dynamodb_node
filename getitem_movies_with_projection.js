var AWS = require("aws-sdk");

var creds = new AWS.Credentials('akid', 'secret', 'session');

AWS.config.update({
  region: "us-west-2",
  endpoint: "http://localhost:8000",
  credentials: creds
});



var docClient = new AWS.DynamoDB.DocumentClient();

var table = "Movies";

var year = 1992;
var title = "Movie with list attribute";

var params = {
    TableName: table,
    Key:{
        "yearkey": year,
        "title": title
    },
    ProjectionExpression: 'yearkey, title, records[0], records[1]',
    /*ExpressionAttributeNames: {
      '#users' : 'users[0]'
    },*/
};

docClient.get(params, function(err, data) {
    if (err) {
        console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
        //console.log(data.Item.records.length);
    }
});