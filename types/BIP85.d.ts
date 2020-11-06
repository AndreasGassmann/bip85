/// <reference types="node" />
import { BIP32Interface } from 'bip32';
import { BIP85Child } from './BIP85Child';
/**
 * BIP-85 helper types
 */
declare type BIP85_WORD_LENGTHS = 12 | 18 | 24;
declare type BIP39_LANGUAGES = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
/**
 * Derive BIP-39 child entropy from a BIP-32 root key
 */
export declare class BIP85 {
    private node;
    constructor(node: BIP32Interface);
    deriveBIP39(language: BIP39_LANGUAGES, words: BIP85_WORD_LENGTHS, index?: number): BIP85Child;
    deriveWIF(index?: number): BIP85Child;
    deriveXPRV(index?: number): BIP85Child;
    deriveHex(numBytes: number, index?: number): BIP85Child;
    derive(path: string, bytesLength: number): string;
    static fromBase58(bip32seed: string): BIP85;
    static fromSeed(bip32seed: Buffer): BIP85;
    static fromEntropy(entropy: string, password?: string): BIP85;
    static fromMnemonic(mnemonic: string, password?: string): BIP85;
}
export {};
