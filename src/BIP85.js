"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BIP85 = exports.BIP85_APPLICATIONS = void 0;
const bip32_1 = require("bip32");
const crypto_1 = require("./crypto");
const util_1 = require("./util");
const bip39_1 = require("bip39");
const BIP85Child_1 = require("./BIP85Child");
// https://github.com/bitcoin/bips/blob/master/bip-0085.mediawiki
/**
 * Constants defined in BIP-85
 */
const BIP85_KEY = 'bip-entropy-from-k';
const BIP85_DERIVATION_PATH = 83696968;
var BIP85_APPLICATIONS;
(function (BIP85_APPLICATIONS) {
    BIP85_APPLICATIONS[BIP85_APPLICATIONS["BIP39"] = 39] = "BIP39";
    BIP85_APPLICATIONS[BIP85_APPLICATIONS["WIF"] = 2] = "WIF";
    BIP85_APPLICATIONS[BIP85_APPLICATIONS["XPRV"] = 32] = "XPRV";
    BIP85_APPLICATIONS[BIP85_APPLICATIONS["HEX"] = 128169] = "HEX";
})(BIP85_APPLICATIONS = exports.BIP85_APPLICATIONS || (exports.BIP85_APPLICATIONS = {}));
/**
 * Derive BIP-39 child entropy from a BIP-32 root key
 */
class BIP85 {
    constructor(node) {
        this.node = node;
    }
    deriveBIP39(language, words, index = 0) {
        if (!util_1.isValidIndex(index)) {
            throw new Error('BIP39 invalid index');
        }
        if (typeof language !== 'number') {
            throw new Error('BIP39 invalid language type');
        }
        if (!(language >= 0 && language <= 8)) {
            throw new Error('BIP39 invalid language');
        }
        const entropyLength = (() => {
            switch (words) {
                case 12:
                    return 16;
                case 18:
                    return 24;
                case 24:
                    return 32;
                default:
                    throw new Error('BIP39 invalid mnemonic length');
            }
        })();
        const entropy = this.derive(`m/${BIP85_DERIVATION_PATH}'/${BIP85_APPLICATIONS.BIP39}'/${language}'/${words}'/${index}'`, entropyLength);
        return new BIP85Child_1.BIP85Child(entropy, BIP85_APPLICATIONS.BIP39);
    }
    deriveWIF(index = 0) {
        if (!util_1.isValidIndex(index)) {
            throw new Error('WIF invalid index');
        }
        const entropy = this.derive(`m/${BIP85_DERIVATION_PATH}'/${BIP85_APPLICATIONS.WIF}'/${index}'`, 32);
        return new BIP85Child_1.BIP85Child(entropy, BIP85_APPLICATIONS.WIF);
    }
    deriveXPRV(index = 0) {
        if (!util_1.isValidIndex(index)) {
            throw new Error('XPRV invalid index');
        }
        const entropy = this.derive(`m/${BIP85_DERIVATION_PATH}'/${BIP85_APPLICATIONS.XPRV}'/${index}'`, 64);
        return new BIP85Child_1.BIP85Child(entropy, BIP85_APPLICATIONS.XPRV);
    }
    deriveHex(numBytes, index = 0) {
        if (!util_1.isValidIndex(index)) {
            throw new Error('HEX invalid index');
        }
        if (typeof numBytes !== 'number') {
            throw new Error('HEX invalid byte length type');
        }
        if (numBytes < 16 || numBytes > 64) {
            throw new Error('HEX invalid byte length');
        }
        const entropy = this.derive(`m/${BIP85_DERIVATION_PATH}'/${BIP85_APPLICATIONS.HEX}'/${numBytes}'/${index}'`, numBytes);
        return new BIP85Child_1.BIP85Child(entropy, BIP85_APPLICATIONS.HEX);
    }
    derive(path, bytesLength = 64) {
        const childNode = this.node.derivePath(path);
        const childPrivateKey = childNode.privateKey; // Child derived from root key always has private key
        const hash = crypto_1.hmacSHA512(Buffer.from(BIP85_KEY), childPrivateKey);
        const truncatedHash = hash.slice(0, bytesLength);
        const childEntropy = truncatedHash.toString('hex');
        return childEntropy;
    }
    static fromBase58(bip32seed) {
        const node = bip32_1.fromBase58(bip32seed);
        if (node.depth !== 0) {
            throw new Error('Expected master, got child');
        }
        return new BIP85(node);
    }
    static fromSeed(bip32seed) {
        const node = bip32_1.fromSeed(bip32seed);
        if (node.depth !== 0) {
            throw new Error('Expected master, got child');
        }
        return new BIP85(node);
    }
    static fromEntropy(entropy, password = '') {
        const mnemonic = bip39_1.entropyToMnemonic(entropy);
        return BIP85.fromMnemonic(mnemonic, password);
    }
    static fromMnemonic(mnemonic, password = '') {
        if (!bip39_1.validateMnemonic(mnemonic)) {
            throw new Error('Invalid mnemonic');
        }
        const seed = bip39_1.mnemonicToSeedSync(mnemonic, password);
        return BIP85.fromSeed(seed);
    }
}
exports.BIP85 = BIP85;
