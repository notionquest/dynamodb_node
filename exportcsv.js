var fs = require('fs');
var express = require('express');
csv = require('express-csv');
var request = require('request');
var cheerio = require('cheerio');
var async = require('async');
var app     = express();

var fs = require('fs'); 
var parse = require('csv-parse');

var csvData=[];
fs.createReadStream("C:\\Users\\sakumar\\Downloads\\FL_insurance_sample.csv")
    .pipe(parse({delimiter: ':'}))
    .on('data', function(csvrow) {
        //console.log(csvrow);
        //do something with csvrow
        csvData.push(csvrow);        
    })
    .on('end',function() {
      //do something wiht csvData
      //console.log(csvData);
    });

app.get('/scraper', function(req, res){
    var offset = req.query.offset || 0;
    var limit = req.query.limit || 50;

    /*if(gCounter === 0){
        getStreamerInfo(offset, limit, function(response){
    */        console.log("FILE READY!");
            res.csv(csvData); // this export to browser but I want to save directly to a folder
            
            
       /* });
    }
*/
});


app.listen(3000, function () {
	  console.log('Example app listening on port 3000!');
	});