var Joi = require('joi');
var vogels = require('vogels');

var AWS = require("aws-sdk");
var creds = new AWS.Credentials('userid', 'password', 'session');

vogels.AWS.config.update({
    region: "us-west-2",
    endpoint: "http://localhost:8000",
    credentials: creds
});

var Stock = vogels.define('Stock', {
    hashKey: 'ID',

    schema: {
        ID: Joi.string(),
        DateUTC: Joi.string()
    },
    indexes: [{
        hashKey: 'DateUTC', name: 'stock_index', type: 'global'
    }],
    tableName: 'stock'
});

//Stock.query('1').loadAll().exec(queryCallback);

const query = Stock.query('1');
query.loadAll();
query.exec((err, result) => {if(!err) {console.log(JSON.stringify(result,undefined, 2))}});

/*function queryCallback (err, data) {
    if (err) {
        console.log(err);
    } else {
        console.log(JSON.stringify(data,undefined, 2));
    }
    
}*/
