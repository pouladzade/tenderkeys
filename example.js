'use strict'

var TenderKeys = require('./index');
var tenderKeys = new TenderKeys;

var mnemonic = tenderKeys.generateRandomMnemonic();
var seed     =  tenderKeys.generateSeed(mnemonic);
var keyPair  = tenderKeys.generateKeyPair(seed);
var address  = tenderKeys.getAddressFromPubKey(keyPair.publicKey);

console.log("mnemonic    :" + mnemonic);
console.log("private key :" + keyPair.privateKey);
console.log("Public key  :" + keyPair.publicKey);
console.log("address     :" + address);