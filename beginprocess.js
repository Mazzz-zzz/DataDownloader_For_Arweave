const fs = require('fs');
const axios = require('axios').default;

const peerfind = require("./getpeers.js");
const datagrab = require("./grabdata.js");

peerfind.morepeers();
datagrab.maingrab();


