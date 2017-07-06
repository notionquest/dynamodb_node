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

Employee.get('UK').then(function (data) {
    console.log('Get :' + JSON.stringify(data));
});

Employee.query('branch').eq('UK').exec(function (err, data) {
  console.log('Query :' + JSON.stringify(data));
});

Employee.query('branch').descending('hfhf', 'dsgsdg').eq('UK').exec(function (err, data) {
  console.log('Query sorting :' + JSON.stringify(data));
});


Employee.scan('domain').eq('Banking').exec(function (err, data) {
  console.log('Scan :' + JSON.stringify(data));
});

