'use strict'

var crypto    = require("crypto");
var bip39     = require("bip39");
var ed25519   = require("ed25519");
var RIPEMD160 = require("ripemd160");

const TYPE_ED25519      = '01';
const PUBKEY_PREFIX     = '0120';//0x01   0x20 = 32 

const PUBKEY_LENGTH     = 64; // 32 bytes
const SEED_LENGTH       = 64; // 32 bytes
const PRIVKEY_LENGTH    = 128; // 64 bytes
const ADDRESS_LENGTH    = 40; //20 bytes

const PUBKEY_NAME       = 'PublicKey';
const SEED_NAME         =  'Seed';
const PRIVKEY_NAME      = 'PrivateKey';
const ADDRESS_NAME      = 'Address';


module.exports = class TenderKeys {
      
      generateKeyPair(seed){
        let buffer = new Buffer(seed, "hex")
        let keyPair = ed25519.MakeKeypair(buffer);
        return {publicKey:keyPair.publicKey.toString('hex').toUpperCase(),
                privateKey:keyPair.privateKey.toString("hex").toUpperCase()};
      }
      
      generateRandomMnemonic(){
      
        return bip39.generateMnemonic();
      
      }
      
      generateSeed(mnemonic){
      
        let hash = crypto.createHash('sha256');
        hash.update(mnemonic);
        return hash.digest('hex').toUpperCase();
        
      }
      
      getAddressFromPubKey(publicKey){
        this._isHexString(publicKey,PUBKEY_NAME,PUBKEY_LENGTH);
        let ripmd160 = new RIPEMD160();
        let encodedPubKey = this._hexStringToBytes(TYPE_ED25519 + PUBKEY_PREFIX + publicKey);
        var buffer = new Buffer(encodedPubKey);
        return ripmd160.update(buffer).digest('hex').toUpperCase();
      }

      getAddressFromPrivKey(privateKey){
        this._isHexString(privateKey,PRIVKEY_NAME,PRIVKEY_LENGTH);
        let publicKey = privateKey.substring(32,64);
        return this.getAddressFromPubKey(publicKey);

      }
      
      getPubKeyFromPrivKey(privateKey){
        this._isHexString(privateKey,PRIVKEY_NAME,PRIVKEY_LENGTH);
        return this.privateKey.substring(32,64);

      }

      validateMnemonic(mnemonic){
      
        return bip39.validateMnemonic(mnemonic);
      
      }

      validateAddress(publicKey, address){
        this._isHexString(publicKey,PUBKEY_NAME,PUBKEY_LENGTH);
        this._isHexString(address,ADDRESS_NAME,ADDRESS_LENGTH);

        if(this.generateAddress(publicKey.toUpperCase() == address.toUpperCase()))
            return true;

        return false;            

      }

      _isHexString(hexString,name,length){

        if (typeof hexString != 'string') {
            throw new Error( '\nError : The type of' + name + ' must be string!' );
        }
        
        if (hexString.length != length) {
            throw new Error( '\nError : The length of' + name + ' must be' + length );
        }

        let arr = hexString.split();
        for (let i = 0; i < arr.length; i++) 
            if (!arr[i].match(/^[0-9A-Fa-f]/))
                throw new Error("Error : unexpected junk in " + name);            
        
      }

      _hexStringToBytes(hexStr) { 

        let result = [];
        while (hexStr.length >= 2) { 
            result.push(parseInt(hexStr.substring(0, 2), 16));
            hexStr = hexStr.substring(2, hexStr.length);
        }
      
        return result;
      }         

}
