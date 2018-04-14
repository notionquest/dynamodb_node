var AWS = require("aws-sdk");

var creds = new AWS.Credentials('akid', 'secret', 'session');

AWS.config.update({
  region: "us-west-2",
  endpoint: "http://localhost:8000",
  credentials: creds
});

var dynamodb = new AWS.DynamoDB();

var table = "Movies";

var params = {
    TableName: table,
    Key:{
        "yearkey": {N: "1990"},
        "title": {S : "Movie with list of strings using var 3"}
    }
    
};

dynamodb.getItem(params, function(err, data) {
    if (err) {
        console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("GetItem succeeded:", JSON.stringify(data, null, 2));        
        console.log("data :", data.Item);        
    }
});