var AWS = require("aws-sdk");
var creds = new AWS.Credentials('akid', 'secret', 'session');

AWS.config.update({
  region: "us-west-2",
  endpoint: "http://localhost:8000",
  credentials : creds
});

var docClient = new AWS.DynamoDB.DocumentClient();

const createDocument = (text, callback) => {
  const createParams = {
    Item: {
        "yearkey": 2017,
        "title": 'Callback test',
    },
    TableName: 'Movies'
  }

  docClient.put(createParams, (err, data) => {
    if(err) {
      callback(err, null)
    } else {
      //callback(null, data)
      console.log(data)
      return
    }
  })
}

createDocument(null, (err, data) => {
    if(err) {
      callback(err, null)
    } else {
      callback(null, data)
    }
});