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

app.post("/register", function (req, res) {

    var params = {
        TableName: 'Books',
        Item: {
            "APIuserID": 4,
            "f_name": "some dummy name"
        }
    };

    console.log(params);
    docClient.put(params, function (err, data) {
        if (err) {
            console.error("Unable to add item. Error JSON:", JSON.stringify(err,
                null, 2));
            res.send(err);
        } else {
            console.log("Added item:", JSON.stringify(data, null, 2));
            res.send('<h1>some html</h1>');
        }
    });

});

app.listen(3000);