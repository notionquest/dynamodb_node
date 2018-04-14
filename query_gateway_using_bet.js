var AWS = require("aws-sdk");

var creds = new AWS.Credentials('akid', 'secret', 'session');

AWS.config.update({
	region : "us-west-2",
	endpoint : "http://localhost:8000",
	credentials : creds
});

var dynamodb = new AWS.DynamoDB;

var table = "gateway";

var params = {
	TableName : table,
	KeyConditions: {
        "device_id" : {
            "ComparisonOperator" : "EQ",
            "AttributeValueList" : [{"S":"d1"}]
        },
        "timestampAttr" : {
            "ComparisonOperator" : "BETWEEN",
            "AttributeValueList" : [ { "N" : "20170101" } , { "N" : "20171231" } ]
        }
    },
    Select: 'SPECIFIC_ATTRIBUTES',
    AttributesToGet: ['device_id']
};

dynamodb.query(params, function(err, data) {
	if (err) {
		console.error("Unable to read item. Error JSON:", JSON.stringify(err,
				null, 2));
	} else {
		console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
	}
});