import { BIP85 } from '../types';

const xprv =
  'xprv9s21ZrQH143K2LBWUUQRFXhucrQqBpKdRRxNVq2zBqsx8HVqFk2uYo8kmbaLLHRdqtQpUm98uKfu3vca1LqdGhUtyoFnCNkfmXRyPXLjbKb';

const masterSeed = BIP85.fromBase58(xprv);

// BIP39 example 1
{
  const childSeed = masterSeed.deriveBIP39(0, 12, 0);

  const expectedEntropy = '6250b68daf746d12a24d58b4787a714b';
  const expectedMnemonic =
    'girl mad pet galaxy egg matter matrix prison refuse sense ordinary nose';

  console.log(
    'BIP39 example 1 entropy match:',
    childSeed.toEntropy() === expectedEntropy,
  );
  console.log(
    'BIP39 example 1 mnemonic match:',
    childSeed.toMnemonic() === expectedMnemonic,
  );
}

// BIP39 example 2
{
  const childSeed = masterSeed.deriveBIP39(0, 18, 0);

  const expectedEntropy = '938033ed8b12698449d4bbca3c853c66b293ea1b1ce9d9dc';
  const expectedMnemonic =
    'near account window bike charge season chef number sketch tomorrow excuse sniff circle vital hockey outdoor supply token';

  console.log(
    'BIP39 example 2 entropy match:',
    childSeed.toEntropy() === expectedEntropy,
  );
  console.log(
    'BIP39 example 2 mnemonic match:',
    childSeed.toMnemonic() === expectedMnemonic,
  );
}

// BIP39 example 3
{
  const childSeed = masterSeed.deriveBIP39(0, 24, 0);

  const expectedEntropy =
    'ae131e2312cdc61331542efe0d1077bac5ea803adf24b313a4f0e48e9c51f37f';
  const expectedMnemonic =
    'puppy ocean match cereal symbol another shed magic wrap hammer bulb intact gadget divorce twin tonight reason outdoor destroy simple truth cigar social volcano';

  console.log(
    'BIP39 example 3 entropy match:',
    childSeed.toEntropy() === expectedEntropy,
  );
  console.log(
    'BIP39 example 3 mnemonic match:',
    childSeed.toMnemonic() === expectedMnemonic,
  );
}

// WIF example
{
  const childSeed = masterSeed.deriveWIF(0);

  const expectedEntropy =
    '7040bb53104f27367f317558e78a994ada7296c6fde36a364e5baf206e502bb1';
  const expectedWIF = 'Kzyv4uF39d4Jrw2W7UryTHwZr1zQVNk4dAFyqE6BuMrMh1Za7uhp';

  console.log('XPRV entropy match:', childSeed.toEntropy() === expectedEntropy);
  console.log('XPRV xprv match:', childSeed.toWIF() === expectedWIF);
}

// XPRV example
{
  const childSeed = masterSeed.deriveXPRV(0);

  const expectedEntropy =
    'ead0b33988a616cf6a497f1c169d9e92562604e38305ccd3fc96f2252c177682';
  const expectedXPRV =
    'xprv9s21ZrQH143K2srSbCSg4m4kLvPMzcWydgmKEnMmoZUurYuBuYG46c6P71UGXMzmriLzCCBvKQWBUv3vPB3m1SATMhp3uEjXHJ42jFg7myX';

  console.log('XPRV entropy match:', childSeed.toEntropy() === expectedEntropy);
  console.log('XPRV xprv match:', childSeed.toXPRV() === expectedXPRV);
}

// HEX example
{
  const childSeed = masterSeed.deriveHex(64);

  const expectedEntropy =
    '492db4698cf3b73a5a24998aa3e9d7fa96275d85724a91e71aa2d645442f878555d078fd1f1f67e368976f04137b1f7a0d19232136ca50c44614af72b5582a5c';

  console.log('HEX match:', childSeed.toEntropy() === expectedEntropy);
}
