var AWS = require("aws-sdk");
var async = require("async");

var creds = new AWS.Credentials('akid', 'secret', 'session');

AWS.config.update({
    region: "us-west-2",
    endpoint: "http://localhost:8000",
    credentials: creds
});

var docClient = new AWS.DynamoDB.DocumentClient();
console.log("Scanning Movies table.");

var scanFunctions = [];
var totalSegments = 11;
var segmentNos = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

segmentNos.forEach(function (segmentNo)  {
    console.log(segmentNo);
    var scanFunction = function (callback) {
        console.log("scanning ..." + segmentNo);
        docClient.scan({
            TableName: 'Movies',
            Segment: segmentNo,
            TotalSegments: totalSegments                  
        }, function (err, res) {
            if (err) {
                console.log("Error ===>" + JSON.stringify(err));
            } else {
                console.log("SegmentNo ===>" + segmentNo + "   ;Data ===>" + JSON.stringify(res));
            }
            callback(err, res.Items);
            
        });
        
    }
    console.log('pushing scan funs to array....');
    scanFunctions.push(scanFunction);
});

async.parallel(scanFunctions, function (err, results) {
    console.log("Results ===>" + JSON.stringify(results, null, 4));
});



