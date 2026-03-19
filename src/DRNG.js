import { shake256 } from '@noble/hashes/sha3.js';
export class BIP85DRNG {
    reader;
    constructor(entropy) {
        this.reader = shake256.create({ dkLen: 0 });
        this.reader.update(entropy);
    }
    static fromEntropy(entropy) {
        if (!(entropy instanceof Uint8Array)) {
            throw new TypeError('BIP85DRNG input entropy must be Uint8Array.');
        }
        if (entropy.length !== 64) {
            throw new Error('BIP85DRNG input entropy must be exactly 512 bits.');
        }
        return new BIP85DRNG(entropy);
    }
    read(length) {
        return this.reader.xof(length);
    }
}
