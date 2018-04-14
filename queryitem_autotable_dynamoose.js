var dynamoose = require('dynamoose');
dynamoose.AWS.config.update({
	accessKeyId: 'AKID',
	secretAccessKey: 'SECRET',
	region: 'us-east-1'
});
dynamoose.local();

var Schema = dynamoose.Schema;
var Table = dynamoose.Table;

var AutoTable = dynamoose.model('autotable', { autoID: String, alexandriaID: String, docType: String });

AutoTable.query('autoID').eq('yyy').descending('docType').exec(function (err, data) {
	//AutoTable.query('autoID').eq('yyy').exec(function (err, data) {    
	console.log('Query sorting :' + JSON.stringify(data));
});

