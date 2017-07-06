var AWS = require("aws-sdk");
var creds = new AWS.Credentials('akid', 'secret', 'session');

AWS.config.update({
  region: "us-west-2",
  endpoint: "http://localhost:8000",
  credentials : creds
});

var docClient = new AWS.DynamoDB.DocumentClient();

var table = "lob";


var params = {
    TableName:table,
    Item:{
    	"ID" : "4",
    	"identifier": {
            "primary": "9927fd47-5d33-4f51-a5bb-f292a0c733b1",
            "secondary": "none",
            "tertiary": "cfd96cab-767e-5091-8be5-3d2896a3efeb"
        },
        "attributes": {
            "key1" : "value",
            "MyID": {
                "Type": "String",
                "Value": "9927fd47-5c33-4f51-a5bb-f292a0c733b1"
            }
        }
    }    
};

console.log("Adding a new item...");
docClient.put(params, function(err, data) {
    if (err) {
        console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Added item:", JSON.stringify(data, null, 2));
    }
});