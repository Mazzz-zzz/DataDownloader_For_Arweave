const fs = require('fs');
const axios = require('axios').default;

const peerfind = require("./getpeers.js");
const datagrab = require("./grabdata.js");

const args = process.argv;
var timeout_ms = 4000;
var delay_ms = 30;

var firstblock = 1;
var lastblock = 356000;

if ((args[3] != undefined)) {
    timeout_ms = args[3];
}
if ((args[4] != undefined)) {
    delay_ms = args[4];
}
if ((args[5] != undefined)) {
    firstblock = args[5];
}
if ((args[6] != undefined)) {
    lastblock = args[6];
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
	datagrab.maingrab(timeout_ms, delay_ms, firstblock, lastblock);
}
else {
	console.log("something went wrong. Are you sure you typed your arguements in correctly?");
};

//peerfind.morepeers();
//datagrab.maingrab();


