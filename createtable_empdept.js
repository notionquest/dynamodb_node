var AWS = require("aws-sdk");

AWS.config.update({
    region: "us-west-2",
    endpoint: "http://localhost:8000"
});

var dynamodb = new AWS.DynamoDB();

var params = {
    TableName: "empdept",
    KeySchema: [
        { AttributeName: "name", KeyType: "HASH" },
        { AttributeName: "department", KeyType: "RANGE" }

    ],
    AttributeDefinitions: [
        { AttributeName: "name", AttributeType: "S" },
        { AttributeName: "department", AttributeType: "S" },
        { AttributeName: "date_of_joining", AttributeType: "S" }
    ],
    GlobalSecondaryIndexes: [
        {
            IndexName: 'empdept_doj', /* required */
            KeySchema: [ /* required */
                {
                    AttributeName: 'date_of_joining', /* required */
                    KeyType: 'HASH' /* required */
                },
                /* more items */
            ],
            Projection: { /* required */
                /*NonKeyAttributes: [
                    'STRING_VALUE',
                    /* more items 
                ],*/
                ProjectionType: 'ALL'
            },
            ProvisionedThroughput: { /* required */
                ReadCapacityUnits: 10, /* required */
                WriteCapacityUnits: 10 /* required */
            }
        },
        /* more items */
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 10,
        WriteCapacityUnits: 10
    }
};

dynamodb.createTable(params, function (err, data) {
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