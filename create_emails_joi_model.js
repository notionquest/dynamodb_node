var Joi = require('joi');
var vogels = require('vogels');
var nodeUUID = require('node-uuid');

var AWS = require("aws-sdk");
var creds = new AWS.Credentials('userid', 'password', 'session');

vogels.AWS.config.update({
	region : "us-west-2",
	endpoint : "http://localhost:8000",
	credentials : creds
});

var Emails = vogels.define('Emails', {
	hashKey : 'email',

	// add the timestamp attributes (updatedAt, createdAt)
	timestamps : true,

	schema : {
		email : Joi.string().email(),
		item : Joi.array().items(Joi.object().keys({
			a : vogels.types.uuid(),
			b : Joi.string(),
			c : Joi.string(),
			d : Joi.string().email()
		}))
	}
});

//Table name is 'emailss'

/*vogels.createTables(function(err) {
 if (err) {
 console.log('Error creating tables: ', err);
 } else {
 console.log('Tables has been created');
 }
 });*/

var Obj = {
	email : 'abc@b.com',
	item : [ {
		a : nodeUUID.v1(),
		b : 'data',
		c : 'some-data',
		d : 'b@c.com'
	} ]
};
Emails.create(Obj, function(err, data) {
	if (err) {
		console.log(err);

	} else {
		console.log(data);
	}
});
