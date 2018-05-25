# tenderkeys.js
A module for creating bip39 mnemonic, ed25519  key pair and ripemd160 address for Tendermint and Hyperledger Burrow

## Example:
```js



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
```
## output
```


mnemonic    :beauty embark high upgrade vanish indicate shuffle drum gospel crime denial mixture
private key :831DE5360A51DF4B4E796799AC5B80EE4E6CB580CB3D6BAD863095DE0C01016EE15BD7489B75740F9B40DA3B370692A5165E609E06EC63DAF4C4964982DFB62E
Public key  :E15BD7489B75740F9B40DA3B370692A5165E609E06EC63DAF4C4964982DFB62E
address     :C16E051F8F33B9497A5D48979F700FEBB5AEF7FA

```


