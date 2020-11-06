import { fromSeed } from 'bip32';
import { mnemonicToEntropy, mnemonicToSeedSync } from 'bip39';
import { BIP85 } from '../ts_src';

const mnemonic =
  'install scatter logic circle pencil average fall shoe quantum disease suspect usage'; // Mnemonic

const entropy = mnemonicToEntropy(mnemonic); // 75780e0e149a2a1f948e33af47e36b77
const seed = mnemonicToSeedSync(mnemonic); // <Buffer 37 48 34 72 a6 af 7f d1 07 fb 5f 5a aa a7 bd dc 89 69 03 53 36 92 29 77 1c 32 81 2f 71 12 07 c8 73 98 a8 d4 4c fc 76 3a 81 85 ff 34 62 72 e8 f1 45 51 ... 14 more bytes>
const base58 = fromSeed(seed).toBase58(); // xprv9s21ZrQH143K2LBWUUQRFXhucrQqBpKdRRxNVq2zBqsx8HVqFk2uYo8kmbaLLHRdqtQpUm98uKfu3vca1LqdGhUtyoFnCNkfmXRyPXLjbKb

const masterSeed1 = BIP85.fromMnemonic(mnemonic);
const masterSeed2 = BIP85.fromEntropy(entropy);
const masterSeed3 = BIP85.fromSeed(seed);
const masterSeed4 = BIP85.fromBase58(base58);

const language = 0;
const wordLength = 12;
const index = 0;

console.log(masterSeed1.deriveBIP39(language, wordLength, index).toMnemonic());
console.log(masterSeed2.deriveBIP39(language, wordLength, index).toMnemonic());
console.log(masterSeed3.deriveBIP39(language, wordLength, index).toMnemonic());
console.log(masterSeed4.deriveBIP39(language, wordLength, index).toMnemonic());

console.log(
  'BIP39',
  masterSeed1.deriveBIP39(language, wordLength, index).toEntropy(),
);

console.log('WIF', masterSeed1.deriveWIF(0).toEntropy());
console.log('WIF', masterSeed1.deriveWIF(0).toWIF());

console.log('XPRV', masterSeed1.deriveXPRV(0).toEntropy());
console.log('XPRV', masterSeed1.deriveXPRV(0).toXPRV());

console.log('HEX', masterSeed1.deriveHex(64).toEntropy());

console.log('CUSTOM', masterSeed1.derive(`m/83696968'/0'/0'`));
