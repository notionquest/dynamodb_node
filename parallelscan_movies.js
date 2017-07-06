var AWS = require("aws-sdk");
var async = require("async");

var creds = new AWS.Credentials('akid', 'secret', 'session');

AWS.config.update({
    region: "us-west-2",
    endpoint: "http://localhost:8000",
    credentials: creds
});

var docClient = new AWS.DynamoDB.DocumentClient();

var scanFunctions = [];
console.log("Scanning Movies table.");
/*var segmentNo =0;
var totalSegments = 5;
for (segmentNo = 0; segmentNo < totalSegments-1; segmentNo++) {

    console.log("iterating ..." + segmentNo);
    var scanFunction = function (callback) {
        console.log("scanning ...");
        docClient.scan({
            TableName: 'Movies',
            Segment: segmentNo,
            TotalSegments: totalSegments,
            Limit : 2
            
        }, function (err, res) {
            if (err) {
                console.log("Error ===>" + JSON.stringify(err));
            } else {
                console.log("SegmentNo ===>" + segmentNo + ";Data ===>" + JSON.stringify(res));
            }
            
        });
        
    }
    console.log(scanFunction);
    scanFunctions.push(scanFunction);
    scanFunction = "";
}

async.parallel(scanFunctions, function (err, results) {
    console.log("Results ===>" + results);
});*/

var totalSegments = 4;
var scanFunction = function (segmentNo, callback) {
    console.log(segmentNo);
    docClient.scan({
        TableName: 'Movies',
        Segment: segmentNo,
        TotalSegments: totalSegments,
        Limit: 2

    }, function (err, res) {
        if (err) {
            console.log("Error ===>" + JSON.stringify(err));
        } else {
            console.log("SegmentNo ===>" + segmentNo + ";;;;;;  Data ===>" + JSON.stringify(res));
        }

    });
}

var segmentNos = [0, 1, 2, 3];

async.forEach(segmentNos, scanFunction, function (err, results) {
    console.log("Results ===>" + results);
});