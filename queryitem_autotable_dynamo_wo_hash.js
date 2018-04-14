var dynamoose = require('dynamoose');
dynamoose.AWS.config.update({
	accessKeyId: 'AKID',
	secretAccessKey: 'SECRET',
	region: 'us-east-1'
});
dynamoose.local();

var Schema = dynamoose.Schema;
var Table = dynamoose.Table;

var AutoTable = dynamoose.model('autotable', { autoID: String, 
    alexandriaID: String, docType: String });

AutoTable.query('docType').eq('foo').exec(function (err, data) {
    if (err) {
        console.log('Query sorting :' + JSON.stringify(err));
    } else {
        console.log('Query sorting :' + JSON.stringify(data));
    }		
});

