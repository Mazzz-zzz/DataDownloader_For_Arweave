const fs = require('fs');
const axios = require('axios').default;

exports.initgetpeers = initgetpeers;
exports.morepeers = morepeers;


function initgetpeers(timeout_ms) {
	fs.readFile('peers.json', (err, data) => {
  		if (err) throw err;
  		var peers = JSON.parse(data);
		console.log(peers);
		axios.get('http://arweave.net/peers', {timeout: timeout_ms}).then(function (response) {
				for (i = 0; i<= response.data.length; i++) {
				if (peers.includes(response.data[i])) {
					continue;
					}
				else if (i < response.data.length) {
					peers.push(response.data[i]);
					console.log(peers.length);
				}
				else {
					s_peers = JSON.stringify(peers);
					fs.writeFile('peers.json', s_peers, (err) => {
						if (err) throw err;
						console.log("data saved")
					});
				};
				};
			}).catch(function (error) {console.log(error)});
	});
		

		
};

async function morepeers(timeout_ms) {
	var peeray = JSON.parse(fs.readFileSync("peers.json"));
	for (var j = 0; j <= peeray.length; j++) {
		console.log("run " + j + " out of " + peeray.length);
		await axios.get("http://"+peeray[j]+"/peers", {timeout: timeout_ms})
		.then((response) => {
			for (var k = 0; k<= response.data.length; k++) {
				if (peeray.includes(response.data[k])) {
					continue;
				}
				else {
					peeray.push(response.data[k]);
					console.log("now with " + peeray.length + " unique peers");
				}
			}
		})
		.catch((err) => {
			peeray.splice(j, 1);
			console.log("bad peer removed");
		})
	};
	fs.writeFile("peers.json", JSON.stringify(peeray), (err) => {
		if (err) throw err;
		console.log("new peerdata saved!!!");
	});
};
