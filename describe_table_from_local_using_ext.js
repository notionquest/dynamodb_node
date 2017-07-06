const dynamoConfig  =   require('./database');

var AWS = require("aws-sdk");

console.log(dynamoConfig.region);

AWS.config.update({
	region : dynamoConfig.region,
	endpoint : "http://localhost:8000"
});

var docClient = new AWS.DynamoDB();

var params = {TableName:'table4'};
docClient.describeTable(params, function(err, data) {
    if (err) {
        console.log(err, err.stack);
    } else {
        console.log(data);
        // php.var_dump(data);
    }
});