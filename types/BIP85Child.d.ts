export declare class BIP85Child {
    private readonly entropy;
    private readonly chainCode?;
    constructor(entropy: string, chainCode?: string | undefined);
    toEntropy(): string;
    toMnemonic(): string;
    toWIF(): string;
    toXPRV(): string;
}
