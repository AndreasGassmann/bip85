import { sha256 } from '@noble/hashes/sha2.js';
import baseX from 'base-x';
const RIPPLE_ALPHABET = 'rpshnaf39wBUDNEGHJKLM4PQRST7VWXYZ2bcdeCg65jkm8oFqi1tuvAxyz';
const rippleBase58 = baseX(RIPPLE_ALPHABET);
export function entropyToCrippleSeed(entropyHex) {
    const entropyBytes = new Uint8Array(entropyHex.match(/.{2}/g).map((b) => parseInt(b, 16)));
    const key = new Uint8Array(17);
    key[0] = 0x21;
    key.set(entropyBytes.slice(0, 16), 1);
    const hash1 = sha256(key);
    const hash2 = sha256(hash1);
    const checksum = hash2.slice(0, 4);
    const rawSeed = new Uint8Array(21);
    rawSeed.set(key);
    rawSeed.set(checksum, 17);
    return rippleBase58.encode(rawSeed);
}
