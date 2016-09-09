var BitArray = require('node-bitarray');
var bits = new BitArray('00001100');

var outputbit = [];
var index=bits.length-1;
var outindex=0;
console.log(bits);
while (index >= 0) {
	console.log(index);	
	//console.log(bits.get(index, 1));
	outputbit[outindex] = bits.get(index, 1);
	index--;
	outindex++;
}
console.log(outputbit);