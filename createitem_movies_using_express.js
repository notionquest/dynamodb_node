var AWS = require("aws-sdk");
var creds = new AWS.Credentials('akid', 'secret', 'session');
var express = require('express');

var app = express();

AWS.config.update({
	region : "us-west-2",
	endpoint : "http://localhost:8000",
	credentials : creds
});

var dynamodb = new AWS.DynamoDB();


app.put('/add-movie', function (req, res) {
	var params = {
		TableName:"Movies",
		Item:{
			"yearkey": {"N" : req.query.yearkey},
			"title": {"S" : req.query.title}
			
		}    
	};
    dynamodb.putItem(params, function(err, data) {
        if(err) {
        	console.log(err);
        	res.send("Put is failed...");
        }
        else {
        	console.log(JSON.stringify(data));
        	res.send("Put is successful...");
        }
             
    }); 
});

console.log("App started ...");
app.listen(3000);