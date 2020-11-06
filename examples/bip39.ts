import { BIP85 } from '..';

const mnemonic =
  'girl mad pet galaxy egg matter matrix prison refuse sense ordinary nose';

const masterSeed = BIP85.fromMnemonic(mnemonic);

console.log(masterSeed.deriveBIP39(0, 12, 0).toMnemonic());
