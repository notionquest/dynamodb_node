var AWS = require("aws-sdk");
var creds = new AWS.Credentials('akid', 'secret', 'session');

AWS.config.update({
    region: "us-west-2",
    endpoint: "http://localhost:8000",
    credentials: creds
});

var docClient = new AWS.DynamoDB.DocumentClient();

var postIds = ['1', '2' , '4'];

var params = {
    TableName: "post",
    FilterExpression: "NOT postId in (:postId1, :postId2, :postId3)",
    ExpressionAttributeValues: {
        ":postId1": '1',
        ":postId2": '2',
        ":postId3" : '4'
    }
};

console.log(postIds.toString());
/*var params = {
    TableName: "post",
    FilterExpression: "postId in (:postIds)",
    ExpressionAttributeValues: {
        ":postIds": postIds.toString()
    }
};*/

console.log("Scanning Post table.");
docClient.scan(params, onScan);

function onScan(err, data) {
    if (err) {
        console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Scan succeeded.");
        data.Items.forEach(function (printItem) {
            console.log("Item :", JSON.stringify(printItem));
        });
        
        if (typeof data.LastEvaluatedKey != "undefined") {
            console.log("Scanning for more...");
            params.ExclusiveStartKey = data.LastEvaluatedKey;
            docClient.scan(params, onScan);
        }
    }
}