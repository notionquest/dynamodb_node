var AWS = require("aws-sdk");
var creds = new AWS.Credentials('akid', 'secret', 'session');

AWS.config.update({
    region: "us-west-2",
    endpoint: "http://localhost:8000",
    credentials: creds
});

var dynamodb = new AWS.DynamoDB();
var params = {
  TableName: 'Movies', 
  StreamSpecification: {
    StreamEnabled: true    
  }
};

dynamodb.updateTable(params, function(err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else     console.log(data);           // successful response
});