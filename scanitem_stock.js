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

/*Stock
  .scan().loadAll().exec((err, result) => {if(!err) {console.log(JSON.stringify(result,undefined, 2))}});*/

/*Stock
  .scan().where('ID').ne("1").and.exec((err, result) => {if(!err) {console.log(JSON.stringify(result,undefined, 2))}});  */

var arrayIds = ["1"];
Stock
  .scan().filterExpression('ID IN :ids')
  .expressionAttributeValues({ ':ids' : arrayIds })
  .exec((err, result) => {if(!err) {console.log(JSON.stringify(result,undefined, 2))}});  