var Joi = require('joi');
var dynogels = require('dynogels');

var AWS = require("aws-sdk");
var creds = new AWS.Credentials('userid', 'password', 'session');

dynogels.AWS.config.update({
    region: "us-west-2",
    endpoint: "http://localhost:8000",
    credentials: creds
});

var Stock = dynogels.define('Stock', {
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

/*const scanItem = Stock.scan().filterExpression('ID = :idVal OR (DateUTC BETWEEN :dateVal1 AND :dateVal2)')
                .expressionAttributeValues({ ':idVal' : 1, ':dateVal1' : '21-APR-2017', ':dateVal2' : '23-APR-2017'});*/

const scanItem = Stock.scan().filterExpression('ID = :idVal AND ((arrival BETWEEN :arrDateVal1 AND :arrDateVal2) OR (departure BETWEEN :depDateVal1 AND :depDateVal2)) ')
                .expressionAttributeValues({ ':idVal' : '2', ':arrDateVal1' : '21-APR-2017', ':arrDateVal2' : '23-APR-2017'
            ,':depDateVal1' : '21-APR-2017', ':depDateVal2' : '23-APR-2017'});                

scanItem.exec((err, result) => {if(!err) {console.log(JSON.stringify(result,undefined, 2))}});

