var AWS = require("aws-sdk");

var creds = new AWS.Credentials('akid', 'secret', 'session');

AWS.config.update({
  region: "us-west-2",
  endpoint: "http://localhost:8000",
  credentials: creds
});

var docClient = new AWS.DynamoDB.DocumentClient();

var table = "tablex";

var params = {
    TableName: table,
    Key:{
        "primary_key1": "p1",
        "sort_key1": "s1"
    },
    
};

docClient.get(params, function(err, data) {
    if (err) {
        console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("GetItem succeeded:", JSON.stringify(data, null, 2));        
    }
});