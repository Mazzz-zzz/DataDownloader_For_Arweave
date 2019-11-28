const fs = require("fs");
const axios = require("axios").default;

module.exports.maingrab = main;

timeout_ms = 5000


var peeray = JSON.parse(fs.readFileSync("peers.json"));
var badpeers = [];
var errors = 0;


function createdir(dir) {
	if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
	}
};


function timer(ms) {
 return new Promise(res => setTimeout(res, ms));
}

/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
};

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

async function handlerror(error, peernum, blocknum) {
	errors++;
	console.log(errors + " retries done");
	
	try {
		if (error.response.status == 404) {
		console.log("404, peer not removed");
		}
	}
	catch (err){
		
		badpeers.push(peernum);
		if (peernum > -1) {
  			peeray.splice(peernum, 1);
		};
		console.log("peer " + peernum + " removed");
		console.log(peeray.length + " peers left");
	}
	
	
	outputblockdata(blocknum);
	
}


function outputblockdata(blocknum) {
	var peernum = getRandomInt(0,peeray.length);
	
	axios.get("http://" + peeray[peernum] + "/block/height/"+blocknum, {timeout: timeout_ms})
	.then((response) => {
		writeblock(response.data);
		writewallet(response.data , peernum);
		writetx(response.data, peernum);
	})
	.catch((error) => {
		
		//console.log(errorblocks.length + " retries done");
		
		//badpeers.push(peernum);
		//console.log(peeray.length + " peers left");
		
		//if (peernum > -1) {
  		//	peeray.splice(peernum, 1);
		//}
		//console.log("peer " + peernum + " removed");
		handlerror(error, peernum, blocknum);
	});
}

function writeblock(blockdata) {
	let name = blockdata.height + "_" + blockdata.indep_hash +".json";
	fs.writeFile("blocks/"+name , JSON.stringify(blockdata), (err) => {
		if (err) throw err;
		console.log("block " + blockdata.height + " data saved");
	});
	
};

function writewallet(blockdata, peernum) {
	let name = blockdata.wallet_list + ".json"
	axios.get("http://" + peeray[peernum] + "/block/hash/" + blockdata.indep_hash + "/wallet_list",{timeout: timeout_ms})
	.then((response) => {
		fs.writeFile("wallet_lists/"+name, JSON.stringify(response.data), (err) => {
			if (err) throw err;
			console.log("wallet list saved");
		})
	})
	.catch((error) => {
		handlerror(error, peernum ,blockdata.height);
	});
};

function writetx(blockdata, peernum) {
	
	/*
	let arraylength = blockdata.txs.length;
	let count = 0
	while (count < arraylength) {
		console.log(blockdata.txs[count]);
		count++;
	}*/
	for (var j = 0; j < blockdata.txs.length; j++) {
		let name = blockdata.txs[j] + ".json";
		axios.get("http://" + peeray[peernum] + /tx/ + blockdata.txs[j], {timeout: timeout_ms})
		.then((response) => {
			fs.writeFile("txs/" + name, JSON.stringify(response.data), (err) => {
				if (err) throw err;
				console.log("tx saved");
			});
		})
		.catch((error) => {
			handlerror(error, peernum ,blockdata.height);
		});
	} 
}

async function main(timeout_msf, delay, firstblock, lastblock) {
	createdir("./blocks");
	createdir("./txs");
	createdir("./wallet_lists");
	timeout_ms = timeout_msf
	for (i = firstblock; i<=lastblock; i++) {
		outputblockdata(i);
		await timer(delay);
		if (peeray.length == 0) {
			console.log("no peers left ---- exiting");
			return;
		}
	};
	console.log("Done. Waiting for all promises to resolve.")
}
