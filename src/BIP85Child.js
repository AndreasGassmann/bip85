"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BIP85Child = void 0;
const wif_1 = require("wif");
const bip32_1 = require("bip32");
const bip39_1 = require("bip39");
const BIP85_1 = require("./BIP85");
const uint8array_tools_1 = require("uint8array-tools");
const ecc = require("tiny-secp256k1");
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
        return (0, bip39_1.entropyToMnemonic)(this.entropy);
    }
    toWIF() {
        if (this.type !== BIP85_1.BIP85_APPLICATIONS.WIF) {
            throw new Error('BIP85Child type is not WIF');
        }
        const buf = (0, uint8array_tools_1.fromHex)(this.entropy);
        return (0, wif_1.encode)({ version: 128, privateKey: buf, compressed: true });
    }
    toXPRV() {
        if (this.type !== BIP85_1.BIP85_APPLICATIONS.XPRV) {
            throw new Error('BIP85Child type is not XPRV');
        }
        const chainCode = (0, uint8array_tools_1.fromHex)(this.entropy.slice(0, 64));
        const privateKey = (0, uint8array_tools_1.fromHex)(this.entropy.slice(64, 128));
        const bip32 = (0, bip32_1.default)(ecc);
        return bip32.fromPrivateKey(privateKey, chainCode).toBase58();
    }
}
exports.BIP85Child = BIP85Child;
