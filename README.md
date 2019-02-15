# tenderkeys
A module for creating bip39 mnemonic, ed25519  key pair and ripemd160 address for Tendermint and Hyperledger Burrow v0.23.3

## Example:
```js
'use strict'
var ed25519   = require("ed25519");
var TenderKeys = require('tenderKeys');
var tenderKeys = new TenderKeys;

var mnemonic = tenderKeys.generateRandomMnemonic();
var seed     =  tenderKeys.generateSeed(mnemonic);
var keyPair  = tenderKeys.generateKeyPair(seed);
var tAddress  = tenderKeys.getTendermintAddress(keyPair.publicKey);
var bAddress  = tenderKeys.getBurrowAddress(keyPair.publicKey);

console.log("mnemonic    :" + mnemonic);
console.log("private key :" + keyPair.privateKey);
console.log("Public key  :" + keyPair.publicKey);
console.log("Tendermint address     :" + tAddress);
console.log("Burrow address     :" + bAddress);


let data = '{"chain_id":"BurrowChain_2A0FC2-4F8BA9","tx":[1,{"inputs":[{"address":"6AE5EF855FE4F3771D1B6D6B73E21065ED7670EC","amount":1000,"sequence":8}],"outputs":[{"address":"D7572DA8389D0C3AA64FC8709CA853AFE24F4260","amount":1000}]}]}';
let privKey = 'C01E3035C40C2FF009791C36755848F77EA9FAD484E4A38A17355C72A2C5EDB81474C7654BD711B910F48561FCEC85BC5FAE01B1D209CDF6B60D10F141EC7D5B';
let signature = tenderKeys.sign(privKey,data);
console.log("signature :"+signature);

```
## output
```
mnemonic    :dose stomach gaze budget rare burger rhythm board heart vibrant fat inform
private key :9BC17B6CC6692749DDF7618F879017D68F3C26CBC89B855955A66027AC9417B828364DA583B959FCCDD94051CAA2650D9E8B7BF50AABE0B10872A139E31C0E9C
Public key  :28364DA583B959FCCDD94051CAA2650D9E8B7BF50AABE0B10872A139E31C0E9C
Tendermint address     :524AE6C928D4E37764DC0BC8749A1A234BDF42CB
Burrow address     :77FB4BA81164290997F866B1052966995E5BCD5C
signature :7ad05057b4f94b100a202955881484cdfeb615582da412487b57d0fb79d5148dc955217be07627c19233a923228b0c928a6611085bd659b6bd014be2b734c60c

```




