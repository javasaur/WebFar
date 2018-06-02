const os = require('os');
const fs = require('fs');
const path = require('path');
const {Buffer} = require('Buffer');

let buffer = fs.readFileSync("D:\\blabla.txt");

let json = JSON.stringify(buffer);
console.log(json);
console.log(Buffer.from(JSON.parse(json).data).toString());
