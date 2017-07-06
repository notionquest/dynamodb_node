var fs = require('fs');
var prettyjson = require('prettyjson');
var data = {
    "content": '\ufeffThis is an example with accents : é è à '
};
fs.writeFile('test.txt', JSON.stringify(data),'utf8', function (err) {});