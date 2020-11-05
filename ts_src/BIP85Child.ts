import { encode } from 'wif';
import { fromPrivateKey } from 'bip32';
import { entropyToMnemonic } from 'bip39';

export class BIP85Child {
  constructor(
    private readonly entropy: string,
    private readonly chainCode?: string,
  ) {}

  toEntropy(): string {
    return this.entropy;
  }

  toMnemonic(): string {
    return entropyToMnemonic(this.entropy);
  }

  toWIF(): string {
    const buf = Buffer.from(this.entropy, 'hex');

    return encode(128, buf, true);
  }

  toXPRV(): string {
    if (!this.chainCode) {
      throw new Error('ChainCode is not present');
    }

    const chainCode = Buffer.from(this.chainCode, 'hex');
    const privateKey = Buffer.from(this.entropy, 'hex');

    return fromPrivateKey(privateKey, chainCode).toBase58();
  }
}
