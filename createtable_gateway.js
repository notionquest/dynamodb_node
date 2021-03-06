var AWS = require("aws-sdk");
var creds = new AWS.Credentials('akid', 'secret', 'session');

AWS.config.update({
  region: "us-west-2",
  endpoint: "http://localhost:8000",
  credentials : creds
});

var dynamodb = new AWS.DynamoDB();

var params = {
    TableName : "gateway",
    KeySchema: [       
        { AttributeName: "device_id", KeyType: "HASH"},
        { AttributeName: "timestampAttr", KeyType: "RANGE"}
        
    ],
    AttributeDefinitions: [       
        { AttributeName: "device_id", AttributeType: "S" },
        { AttributeName: "timestampAttr", AttributeType: "N" }        
    ],
    ProvisionedThroughput: {       
        ReadCapacityUnits: 10, 
        WriteCapacityUnits: 10
    }
};

dynamodb.createTable(params, function(err, data) {
    if (err) {
    	if (err.code === "ResourceInUseException" && err.message === "Cannot create preexisting table") {
    		console.log("message ====>" + err.message);
    	} else {
    		console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));	
    	}
        
    } else {
        console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
    }
});