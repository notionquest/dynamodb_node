var AWS = require("aws-sdk");

AWS.config.update({
  region: "us-west-2",
  endpoint: "http://localhost:8000"
});

var dynamodb = new AWS.DynamoDB();

var params = {
        TableName: 'city',
        KeySchema: [ // The type of of schema.  Must start with a HASH type, with an optional second RANGE.
            { // Required HASH type attribute
                AttributeName: 'id',
                KeyType: 'HASH',
            },
            { // Required HASH type attribute
                AttributeName: 'name',
                KeyType: 'RANGE',
            }            

        ],
        AttributeDefinitions: [ // The names and types of all primary and index key attributes only
            {
                AttributeName: 'id',
                AttributeType: 'S', // (S | N | B) for string, number, binary
            },
            {
                AttributeName: 'name',
                AttributeType: 'S', // (S | N | B) for string, number, binary
            },
            {
                AttributeName: 'city',
                AttributeType: 'S', // (S | N | B) for string, number, binary
            },

        ],
        ProvisionedThroughput: { // required provisioned throughput for the table
            ReadCapacityUnits: 400, 
            WriteCapacityUnits: 400, 
        },
        GlobalSecondaryIndexes: [ // optional (list of GlobalSecondaryIndex)
            { 
                IndexName: 'city_index', 
                KeySchema: [
                    { // Required HASH type attribute
                        AttributeName: 'city',
                        KeyType: 'HASH',
                    }
                ],
                Projection: { // attributes to project into the index
                    ProjectionType: 'KEYS_ONLY' // (ALL | KEYS_ONLY | INCLUDE)
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