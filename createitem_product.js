var AWS = require("aws-sdk");
var creds = new AWS.Credentials('akid', 'secret', 'session');

AWS.config.update({
  region: "us-west-2",
  endpoint: "http://localhost:8000",
  credentials : creds
});

var docClient = new AWS.DynamoDB.DocumentClient();

var params = {
    TableName:"Product",
    Item:{
        "product": "IPhone 7+",
        media: [
                {
                    id: "1",
                    type: "image",
                    url: "http://www.apple.com/iphone-6-plus/a.jpg"
                },
                {
                    id: "2",
                    type: "image",
                    url: "http://www.apple.com/iphone-6-plus/b.jpg"
                },
                {
                    id: "3",
                    type: "video",
                    url: "http://www.apple.com/iphone-6-plus/overview.mp4"
                }
            ]
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