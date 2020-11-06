import { BIP85_APPLICATIONS } from './BIP85';
export declare class BIP85Child {
    private readonly entropy;
    private readonly type;
    constructor(entropy: string, type: BIP85_APPLICATIONS);
    toEntropy(): string;
    toMnemonic(): string;
    toWIF(): string;
    toXPRV(): string;
}
