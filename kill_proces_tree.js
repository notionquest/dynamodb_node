var treeKill = require('tree-kill');

treeKill(9440, 'SIGTERM', function(err) {
	console.log("Process has been killed");
});