var dynamoose = require('dynamoose');
dynamoose.AWS.config.update({
	accessKeyId : 'AKID',
	secretAccessKey : 'SECRET',
	region : 'us-east-1'
});
dynamoose.local();

var Schema = dynamoose.Schema;
var Table = dynamoose.Table;

var Movies = dynamoose.model('Movies', { yearkey: Number, title: String });

Movies.query('yearkey').eq('2010').exec(function (err, data) {
  console.log('Query sorting :' + JSON.stringify(data));
});

