const getPW = require('./pwgen')
const length = +process.argv[2] || 8;
console.log(getPW(length));
