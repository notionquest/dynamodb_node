var AWS = require("aws-sdk");
var creds = new AWS.Credentials('akid', 'secret', 'session');

AWS.config.update({
    region: "us-west-2",
    endpoint: "http://localhost:8000",
	credentials : creds
});

var docClient = new AWS.DynamoDB.DocumentClient();

var params = {
    TableName: "lob",
    FilterExpression: "#attributesname = :attributeVal",
    ExpressionAttributeNames: {
        //"#attributesname": "attributes.MyID.Type",
        //"#attributesname": "attributes.MyID.Value",
        "#attributesname": "attributes.key1",
    },
    ExpressionAttributeValues : {
        //":attributeVal" : "9927fd47-5c33-4f51-a5bb-f292a0c733b1"
        ":attributeVal" : "value"
    }
};	

docClient.scan(params, onScan);
var count = 0;

function onScan(err, data) {
    if (err) {
        console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Scan succeeded.");
        console.log(JSON.stringify(data));
        data.Items.forEach(function(itemData) {
           console.log("Item :", ++count,JSON.stringify(itemData));
        });
        
        if (typeof data.LastEvaluatedKey != "undefined") {
            params.ExclusiveStartKey = data.LastEvaluatedKey;
            docClient.scan(params, onScan);
        }
    }
}