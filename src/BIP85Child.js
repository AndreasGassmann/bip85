"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BIP85Child = void 0;
const wif_1 = require("wif");
const bip32_1 = require("bip32");
const bip39_1 = require("bip39");
class BIP85Child {
    constructor(entropy, chainCode) {
        this.entropy = entropy;
        this.chainCode = chainCode;
    }
    toEntropy() {
        return this.entropy;
    }
    toMnemonic() {
        return bip39_1.entropyToMnemonic(this.entropy);
    }
    toWIF() {
        const buf = Buffer.from(this.entropy, 'hex');
        return wif_1.encode(128, buf, true);
    }
    toXPRV() {
        if (!this.chainCode) {
            throw new Error('ChainCode is not present');
        }
        const chainCode = Buffer.from(this.chainCode, 'hex');
        const privateKey = Buffer.from(this.entropy, 'hex');
        return bip32_1.fromPrivateKey(privateKey, chainCode).toBase58();
    }
}
exports.BIP85Child = BIP85Child;
