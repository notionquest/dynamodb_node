var AWS = require("aws-sdk");

AWS.config.update({
  region: "us-west-2",
  endpoint: "http://localhost:8000"
});

var docClient = new AWS.DynamoDB.DocumentClient();

var table = "Movies";

var year = 1502;
var title = "The Big New Movie";

var params = {
    TableName:table,
    Item:{
        "yearkey": year,
        "title": title,
        "info":{
            "plot": "Nothing happens at all.",
            "rating": 0
        }
    },
    ConditionExpression: "yearkey <> :yearKeyVal AND #title <>  :title",
    ExpressionAttributeNames: { 
        "#title" : "title" 
     },
    ExpressionAttributeValues: {
        ":yearKeyVal" : year,
        ":title": {"S": title}
    }
};

console.log("Adding a new item...");
docClient.put(params, function(err, data) {
    if (err) {
        console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
    } else {    	
        console.log("Added item:", JSON.stringify(data, null, 2));
    }
});