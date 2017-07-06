var Joi = require('joi');
var vogels = require('vogels');

var AWS = require("aws-sdk");
var creds = new AWS.Credentials('userid', 'password', 'session');

vogels.AWS.config.update({
	region: "us-west-2",
	endpoint: "http://localhost:8000",
	credentials: creds
});

var Account = vogels.define('Account', {
	hashKey: 'email',

	// add the timestamp attributes (updatedAt, createdAt)
	timestamps: true,

	schema: {
		email: Joi.string().email(),
		name: Joi.string(),
		age: Joi.number(),
		roles: vogels.types.stringSet(),
		settings: {
			nickname: Joi.string(),
			acceptedTerms: Joi.boolean().default(false, "def value")
		}
	}
});

Account.config({tableName: 'Account'});

var acc = new Account({ email: 'test@example.com', name: 'Test Example' });


/*vogels.createTables(function (err) {
	if (err) {
		console.log('Error creating tables: ', err);
	} else {
		console.log('Tables has been created', err);
	}
});*/

acc.save(function (err, data) {
	console.log(JSON.stringify(err));
	if (err) {
		console.log('error creating account in DynamoDB');
	} else {
		console.log('created account in DynamoDB', acc.get('email'));
		console.log(data);
	}

});