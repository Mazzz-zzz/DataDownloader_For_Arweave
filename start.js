const express = require('express')
const app = express()
const port = 3000

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

const axios = require('axios').default;

peerlist = [];


axios.get('http://arweave.net/peers')
  .then(function (response) {
	for (i = 0; i < response.data.length; i++) {
		console.log(response.data[i]+"/peers");
		axios.get("http://"+response.data[i]+"/peers").then(function (response){
			for (i = 0; i< response.data.length; i++) {
				if (peerlist.includes(response.data[i])) {
					continue;
				}
				else {
					peerlist.push(response.data[i])
					console.log(peerlist.length)
					 };
			};
		})
		.catch(function (error) {
			console.log(error)
		});
	}
});


console.log(peerlist)


//app.get('/', (req, res) => res.send('Hello World!'))

//app.listen(port, () => console.log(`Example app listening on port ${port}!`))

