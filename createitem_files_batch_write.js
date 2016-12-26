var AWS = require("aws-sdk");
var creds = new AWS.Credentials('akid', 'secret', 'session');

AWS.config.update({
	region : "us-west-2",
	endpoint : "http://localhost:8000",
	credentials : creds
});

var docClient = new AWS.DynamoDB.DocumentClient();

var params = {
	RequestItems : {
		"files" : [ {
			PutRequest : {
				Item : {
					"fileName" : "file1",
					"userEmail" : "file1@gmail.com",
					"transcription" : "transcription text",
					"features" : [ {
						"relevance" : "0.900906",
						"text" : "keyword"
					} ]
				}
			}
		}, {
			PutRequest : {
				Item : {
					"fileName" : "file2",
					"userEmail" : "file2@gmail.com",
					"transcription" : "transcription text",
					"features" : [ {
						"relevance" : "0.900906",
						"text" : "keyword"
					} ]
				}
			}
		}, {
			PutRequest : {
				Item : {
					"fileName" : "file3",
					"userEmail" : "file3@gmail.com",
					"transcription" : "transcription text",
					"features" : [ {
						"relevance" : "0.900906",
						"text" : "keyword"
					} ]
				}
			}
		}, {
			PutRequest : {
				Item : {
					"fileName" : "file4",
					"userEmail" : "file4@gmail.com",
					"transcription" : "transcription text",
					"features" : [ {
						"relevance" : "0.900906",
						"text" : "keyword"
					} ]
				}
			}
		} ]
	}
};

docClient.batchWrite(params, function(err, data) {
	if (err) {
		console.log(JSON.stringify(err, null, 2));
	} else {
		console.log(JSON.stringify(data, null, 2));
	}		
});