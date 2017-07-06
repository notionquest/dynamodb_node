var AWS = require("aws-sdk");
var creds = new AWS.Credentials('akid', 'secret', 'session');

AWS.config.update({
  region: "us-west-2",
  endpoint: "http://localhost:8000",
  credentials : creds
});

var docClient = new AWS.DynamoDB.DocumentClient();

var table = "Movies";

var year = 2017;
//var title = "The Big New Movie 2012 2";
var title = "Callback test";
var recordObj = {"K1": "V1" ,
	    "K2": "V2" ,
	    "K3": "V3" ,
	    "K4": "V4" };

var params = {
    TableName:table,
    Item:{
        "yearkey": year,
        "title": title
        //"records" : recordObj
        /*"OrgName" : "org value",
        "Description" : "desc value"*/
        /*"info":{
            "plot": "Nothing happens at all.",
            "rating": 0
        },
        "createdate" : "2011-10-05",
		"product" : docClient.createSet(['milk','veg'])
        "past_visits" : 0,
        "past_chats" : 0,
        "reset_time" : 1,*/
    },
    ReturnValues : 'ALL_OLD'
};

console.log("Adding a new item...");
docClient.put(params, function(err, data) {
    if (err) {
        console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Added item:", JSON.stringify(data, null, 2));
    }
});