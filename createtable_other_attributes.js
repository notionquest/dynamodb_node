var AWS = require("aws-sdk");
var creds = new AWS.Credentials('akid', 'secret', 'session');

AWS.config.update({
  region: "us-west-2",
  endpoint: "http://localhost:8000",
  credentials : creds
});

var dynamodb = new AWS.DynamoDB();

/*
 * Error : The number of attributes in key schema must match the number of attributesdefined in attribute definitions.
 */
var params = {
    TableName : "Other_Attributes",
    KeySchema: [       
        { AttributeName: "hashkey", KeyType: "HASH"},  //Partition key
        { AttributeName: "sortkey", KeyType: "RANGE" }  //Sort key
    ],
    AttributeDefinitions: [       
        { AttributeName: "hashkey", AttributeType: "S" },
        { AttributeName: "sortkey", AttributeType: "S" },
        { AttributeName: "attribute1", AttributeType: "S" },
        { AttributeName: "attribute2", AttributeType: "S" },
        { AttributeName: "attribute3", AttributeType: "S" }
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