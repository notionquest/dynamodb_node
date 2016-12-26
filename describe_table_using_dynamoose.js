'use strict';
var dynamoose = require('dynamoose');
dynamoose.AWS.config.update({
	accessKeyId : 'AKID',
	secretAccessKey : 'SECRET',
	region : 'us-east-1'
});
dynamoose.local();

var Schema = dynamoose.Schema;
var Table = dynamoose.Table;

/*var schema = new Schema({
	yearkey : Number,
	title : String
});*/

var table = new Table('Movies', null, null, dynamoose);

table.describe(function(err, data) {
	if (err) {
		console.log(JSON.stringify(err));

	} else {
		console.log(JSON.stringify(data, null, 2));
		console.log("Number of item =====>", JSON.stringify(data.Table.ItemCount, null, 2));
	}
});
