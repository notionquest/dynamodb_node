var AWS = require("aws-sdk");

AWS.config.update({
	region : "us-west-2",
	endpoint : "http://localhost:8000"
});

var documentclient = new AWS.DynamoDB.DocumentClient();

var itemsArray = [];

var item1 = {
	DeleteRequest : {
		Key : {
			'bag' : 'b1'	
		}
	}
};

itemsArray.push(item1);

var item2 = {
	DeleteRequest : {
		Key : {
			'bag' : 'b2'	
		}
	}
};

itemsArray.push(item2);

var params = {
	RequestItems : {
		'Bag' : itemsArray
	}
};
documentclient.batchWrite(params, function(err, data) {
	if (err) {
		console.log('Batch delete unsuccessful ...');
		console.log(err, err.stack); // an error occurred
	} else {
		console.log('Batch delete successful ...');
		console.log(data); // successful response
	}

});