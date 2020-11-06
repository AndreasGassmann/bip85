"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BIP85Child = void 0;
const wif_1 = require("wif");
const bip32_1 = require("bip32");
const bip39_1 = require("bip39");
const BIP85_1 = require("./BIP85");
class BIP85Child {
    constructor(entropy, type) {
        this.entropy = entropy;
        this.type = type;
    }
    toEntropy() {
        if (this.type === BIP85_1.BIP85_APPLICATIONS.XPRV) {
            return this.entropy.slice(64, 128);
        }
        else {
            return this.entropy;
        }
    }
    toMnemonic() {
        if (this.type !== BIP85_1.BIP85_APPLICATIONS.BIP39) {
            throw new Error('BIP85Child type is not BIP39');
        }
        return bip39_1.entropyToMnemonic(this.entropy);
    }
    toWIF() {
        if (this.type !== BIP85_1.BIP85_APPLICATIONS.WIF) {
            throw new Error('BIP85Child type is not WIF');
        }
        const buf = Buffer.from(this.entropy, 'hex');
        return wif_1.encode(128, buf, true);
    }
    toXPRV() {
        if (this.type !== BIP85_1.BIP85_APPLICATIONS.XPRV) {
            throw new Error('BIP85Child type is not XPRV');
        }
        const chainCode = Buffer.from(this.entropy.slice(0, 64), 'hex');
        const privateKey = Buffer.from(this.entropy.slice(64, 128), 'hex');
        return bip32_1.fromPrivateKey(privateKey, chainCode).toBase58();
    }
}
exports.BIP85Child = BIP85Child;
