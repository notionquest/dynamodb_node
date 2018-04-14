var AWS = require("aws-sdk");

AWS.config.update({
    region: "us-west-2",
    endpoint: "http://localhost:8000"
});

var docClient = new AWS.DynamoDB.DocumentClient();

var table = "customer";



var params = {
    TableName: table,
    Item: {
        "customerId": "customer_001",
        "customerName": "itsme",
        "address": {
            "city": "Frankfurt",
            "country": "Germany",
            "street1": "c/o Company xxx",
            "street2": "Europe",
            "street3": "PO Box 406",
            "zip": "12345"
        }
    }
};

console.log("Adding a new item...");
docClient.put(params, function (err, data) {
    if (err) {
        console.error("Unable to add item. Error JSON:", JSON.stringify(err,
            null, 2));
    } else {
        console.log("Added item:", JSON.stringify(data, null, 2));
    }
});