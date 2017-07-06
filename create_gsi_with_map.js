var AWS = require("aws-sdk");

AWS.config.update({
  region: "us-west-2",
  endpoint: "http://localhost:8000"
});

var dynamodb = new AWS.DynamoDB();

var params = {
        TableName: 'dev_GeoActivity1',
        KeySchema: [ // The type of of schema.  Must start with a HASH type, with an optional second RANGE.
            { // Required HASH type attribute
                AttributeName: 'primaryKey',
                KeyType: 'HASH',
            }

        ],
        AttributeDefinitions: [ // The names and types of all primary and index key attributes only
            {
                AttributeName: 'primaryKey',
                AttributeType: 'S', // (S | N | B) for string, number, binary
            },
            {
                AttributeName: 'customerID',
                AttributeType: 'S', // (S | N | B) for string, number, binary
            },
            {
                AttributeName: 'time',
                AttributeType: 'M', // (S | N | B) for string, number, binary
            },

        ],
        ProvisionedThroughput: { // required provisioned throughput for the table
            ReadCapacityUnits: 400, 
            WriteCapacityUnits: 400, 
        },
        GlobalSecondaryIndexes: [ // optional (list of GlobalSecondaryIndex)
            { 
                IndexName: 'highestYTD', 
                KeySchema: [
                    { // Required HASH type attribute
                        AttributeName: 'customerID',
                        KeyType: 'HASH',
                    },
                    { // Optional RANGE key type for HASH + RANGE secondary indexes
                        AttributeName: 'time', 
                        KeyType: 'RANGE', 
                    }
                ],
                Projection: { // attributes to project into the index
                    ProjectionType: 'INCLUDE', // (ALL | KEYS_ONLY | INCLUDE)
                    NonKeyAttributes: [ // required / allowed only for INCLUDE
                        'location',
                        'adId'
                        // ... more attribute names ...
                    ],
                },
                ProvisionedThroughput: { // throughput to provision to the index
                    ReadCapacityUnits: 400,
                    WriteCapacityUnits: 400,
                },
            },
            // ... more global secondary indexes ...
        ],

    };
    dynamodb.createTable(params, function(err, data) {
        if (err){ console.log("error :" +JSON.stringify(err));} // an error occurred
        else console.log("success :" +JSON.stringify(data)); // successful response

    });