var AWS = require("aws-sdk");
var creds = new AWS.Credentials('akid', 'secret', 'session');

AWS.config.update({
    region: "us-west-2",
    endpoint: "http://localhost:8000",
    credentials: creds
});

var docClient = new AWS.DynamoDB.DocumentClient();

var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var app = express();
var urlencoded_body_parser = bodyParser.urlencoded({
    extended: true
});

app.use(bodyParser.json());
app.use(urlencoded_body_parser);

app.post("/save", function (req, res) {

    console.log(req.body);
    console.log(req.body.bookList);
    console.log(req.body.bookList);

    var params = {
        TableName: 'Books',
        Key: {

            "APIuserID":  req.body.APIuserID,
            "f_name": req.body.f_name,
        },

        UpdateExpression: "SET #booklist = list_append(#booklist, :vals)",
        ExpressionAttributeNames: {            
            "#booklist": "booklist"
        },
        ExpressionAttributeValues: {
            ":vals": req.body.bookList,
        },
        ReturnValues: 'UPDATED_NEW',
        ReturnConsumedCapacity: 'NONE',
        ReturnItemCollectionMetrics: 'NONE',
    };

    console.log(params);
    docClient.update(params, function (err, data) {
        if (err) {            
            console.log(err, err.stack); // an error occurred
            res.send(err);
        }
        else {
            console.log(data); // successful response
            res.send(data);
        }
    });

});

app.listen(3000);