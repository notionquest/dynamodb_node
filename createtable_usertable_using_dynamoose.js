var dynamoose = require('dynamoose');
dynamoose.AWS.config.update({
	accessKeyId: 'AKID',
	secretAccessKey: 'SECRET',
	region: 'us-east-1'
});
dynamoose.local();
var Schema = dynamoose.Schema;

var userSchema = new Schema({
	name: {
		type: String,
		hashKey: true
	},
	nickname: String,
	email: String,
	phone: String,
	type: String,
	port: String,
	deviceRegId: String,
	assignFlag: Number,
	created: { type: Date, default: Date.now },
	lastmsg: { type: String },
	lasttime: { type: Date, default: Date.now },
	loginStatus: { type: Boolean, default: false },
	isOnline: { type: Boolean, default: false },
	chats: [{
		from: String,
		msgfrom: Number,
		name: String,
		msg: String,
		date: { type: Date, default: Date.now },
		flag: Number
	}]
},
	{
		throughput: { read: 15, write: 5 }
	});
var Table = dynamoose.Table;

var UserDetails = dynamoose.model('UserDetails', userSchema);

var user1 = new UserDetails({ name: 'John' });

user1.save(function (err) {
	if (err) { return console.log(err); }
	console.log('Added a new item');
});
