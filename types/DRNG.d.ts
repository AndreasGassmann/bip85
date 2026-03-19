export declare class BIP85DRNG {
    private reader;
    private constructor();
    static fromEntropy(entropy: Uint8Array): BIP85DRNG;
    read(length: number): Uint8Array;
}
