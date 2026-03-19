import { encode } from 'wif';
import BIP32Factory from 'bip32';
import { entropyToMnemonic } from 'bip39';
import { BIP85_APPLICATIONS } from './BIP85.js';
import { fromHex } from 'uint8array-tools';
import * as ecc from 'tiny-secp256k1';
export class BIP85Child {
    entropy;
    type;
    constructor(entropy, type) {
        this.entropy = entropy;
        this.type = type;
    }
    toEntropy() {
        if (this.type === BIP85_APPLICATIONS.XPRV) {
            return this.entropy.slice(64, 128);
        }
        else {
            return this.entropy;
        }
    }
    toMnemonic() {
        if (this.type !== BIP85_APPLICATIONS.BIP39) {
            throw new Error('BIP85Child type is not BIP39');
        }
        return entropyToMnemonic(this.entropy);
    }
    toWIF() {
        if (this.type !== BIP85_APPLICATIONS.WIF) {
            throw new Error('BIP85Child type is not WIF');
        }
        const buf = fromHex(this.entropy);
        return encode({ version: 128, privateKey: buf, compressed: true });
    }
    toXPRV() {
        if (this.type !== BIP85_APPLICATIONS.XPRV) {
            throw new Error('BIP85Child type is not XPRV');
        }
        const chainCode = fromHex(this.entropy.slice(0, 64));
        const privateKey = fromHex(this.entropy.slice(64, 128));
        const bip32 = BIP32Factory(ecc);
        return bip32.fromPrivateKey(privateKey, chainCode).toBase58();
    }
}
