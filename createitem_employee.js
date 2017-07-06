var dynamoose = require('dynamoose');
dynamoose.AWS.config.update({
	accessKeyId : 'AKID',
	secretAccessKey : 'SECRET',
	region : 'us-east-1'
});
dynamoose.local();

var Schema = dynamoose.Schema;
var Table = dynamoose.Table;

var Employee = dynamoose.model('employee', { branch: String, domain: String });

var ukbranch = new Employee({branch: 'US', domain: 'Banking'});

ukbranch.save();

console.log("Added a new item...");
