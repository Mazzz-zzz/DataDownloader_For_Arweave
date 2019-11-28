const fs = require('fs');
const axios = require('axios').default;

const peerfind = require("./getpeers.js");
const datagrab = require("./grabdata.js");

const args = process.argv;
var timeout_ms = 5000;

var fromblock = 1;
var toblock = 332000;

if ((args[3] != 'undefined')) {
    timeout_ms = args[3];
}
if ((args[4] != 'undefined')) {
    delay = args[4];
}
if ((args[5] != 'undefined')) {
    fromblock = args[5];
}
if ((args[6] != 'undefined')) {
    toblock = args[6];
}





if (args.length == 2) {
	console.log("Not Enough Arguments, please add: getpeers, morepeers, or getdata");
}
else if (args[2] == "getpeers") {
	
	peerfind.initgetpeers(timeout_ms);
}
else if (args[2] == "morepeers") {
	peerfind.morepeers(timeout_ms);
}
else if (args[2] == "getdata") {
	datagrab.maingrab(timeout_ms, delay, fromblock, toblock)
}
else {
	console.log("something went wrong. Are you sure you typed your arguements in correctly?");
};

//peerfind.morepeers();
//datagrab.maingrab();


