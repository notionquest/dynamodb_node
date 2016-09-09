var crypto = require('crypto');

var CryptoJS = require('crypto-js');

var generator = crypto.createHash('sha1');
generator.update(new Buffer('test'));
console.log(generator.digest('binary'));

var hash = CryptoJS.SHA1('test');

console.log(hash.toString(CryptoJS.enc.Hex));