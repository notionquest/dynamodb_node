var AWS = require("aws-sdk");
var localDynamo = require('local-dynamo');
var dynamoServer = null;
var dynamodb = null;
var dynamo = null;
var treeKill = require('tree-kill');

module.exports = {

	startDB : function() {

		console.log("Launch the dynamodb");
		dynamoServer = localDynamo.launch({
			port : 8000,
			detached : true,
			heap : '512m',
			stdio : 'pipe'
		});
		/*var awsConfig = require('../lib/util').ymlParser('aws');
		AWS.config.update(awsConfig);*/
		AWS.config.update({
			accessKeyId : "TestData",
			secretAccessKey : "TestData",
			region : "localhost",
			endpoint : "http://localhost:8000"
		});
		dynamodb = new AWS.DynamoDB();
		dynamo = dynamodb.DocumentClient;
	},

	stopDB : function() {
		console.log("Stop the dynamodb");
		console.log("Dynamodb pid number :" + dynamoServer.pid);		
		
		treeKill(dynamoServer.pid, 'SIGTERM', function(err) {
			if (err === null) {
				console.log("Dynamodb process has been killed");	
			} else {
				console.log("Dynamodb process hasn't been killed : " + JSON.stringify(err));
			}
			
		});
	},
	

	createTable : function() {
		var params = {
			TableName : "Movies",
			KeySchema : [ {
				AttributeName : "year",
				KeyType : "HASH"
			}, //Partition key
			{
				AttributeName : "title",
				KeyType : "RANGE"
			} //Sort key
			],
			AttributeDefinitions : [ {
				AttributeName : "year",
				AttributeType : "N"
			}, {
				AttributeName : "title",
				AttributeType : "S"
			} ],
			ProvisionedThroughput : {
				ReadCapacityUnits : 10,
				WriteCapacityUnits : 10
			}
		};
		dynamodb.createTable(params, function(err, data) {
			if (err) {
				console.error("Unable to create table. Error JSON:", JSON
						.stringify(err, null, 2));
			} else {
				console.log("Created table. Table description JSON:", JSON
						.stringify(data, null, 2));
			}
		});
	}
};

module.exports.startDB();
//module.exports.createTable();
module.exports.stopDB();

