var docClient = new AWS.DynamoDB({
    region: 'us-east-1',
    endpoint: "http://localhost:8000"
});

var params = {TableName:'table4'};
docClient.describeTable(params, function(err, data) {
    if (err) {
        console.log(err, err.stack);
    } else {
        console.log(data);
        // php.var_dump(data);
    }
});