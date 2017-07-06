var AWS = require("aws-sdk");
var creds = new AWS.Credentials('akid', 'secret', 'session');

AWS.config.update({
  region: "us-west-2",
  endpoint: "http://localhost:8000",
  credentials : creds
});

var dynamodb = new AWS.DynamoDB();

var params = {
    "AttributeDefinitions": [
        {
            "AttributeName": "UserId",
            "AttributeType": "N"
        },
        {
            "AttributeName": "CellPhoneNumber",
            "AttributeType": "N"
        }
    ],
    "TableName": "PBUsers",
    "KeySchema": [
        {
            "AttributeName": "UserId",
            "KeyType": "HASH"
        },
        {
            "AttributeName": "CellPhoneNumber",
            "KeyType": "RANGE"
        }
    ],
    "LocalSecondaryIndexes": [
        {
            "IndexName": "UserIndex",
            "KeySchema": [
                {
                    "AttributeName": "UserId",
                    "KeyType": "HASH"
                },
                {
                    "AttributeName": "CellPhoneNumber",
                    "KeyType": "RANGE"
                }
            ],
            "Projection": {
                "ProjectionType": "KEYS_ONLY"
            }
        }
    ],
    "ProvisionedThroughput": {
        "ReadCapacityUnits": 5,
        "WriteCapacityUnits": 5
    }
}

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