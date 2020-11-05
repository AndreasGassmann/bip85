const BIP85 = require('../../src').BIP85;
const tape = require('tape');

// Test vectors taken from: https://github.com/bitcoin/bips/blob/master/bip-0085.mediawiki#applications

const rootKey =
  'xprv9s21ZrQH143K2LBWUUQRFXhucrQqBpKdRRxNVq2zBqsx8HVqFk2uYo8kmbaLLHRdqtQpUm98uKfu3vca1LqdGhUtyoFnCNkfmXRyPXLjbKb';

tape('works for BIP39, 12 words', (t) => {
  const master = BIP85.fromBase58(rootKey);
  const child = master.deriveBIP39(0, 12, 0);

  t.plan(2);
  t.equal(child.toEntropy(), '6250b68daf746d12a24d58b4787a714b');
  t.equal(
    child.toMnemonic(),
    'girl mad pet galaxy egg matter matrix prison refuse sense ordinary nose',
  );
});

tape('works for BIP39, 18 words', (t) => {
  const master = BIP85.fromBase58(rootKey);
  const child = master.deriveBIP39(0, 18, 0);

  t.plan(2);
  t.equal(
    child.toEntropy(),
    '938033ed8b12698449d4bbca3c853c66b293ea1b1ce9d9dc',
  );
  t.equal(
    child.toMnemonic(),
    'near account window bike charge season chef number sketch tomorrow excuse sniff circle vital hockey outdoor supply token',
  );
});

tape('works for BIP39, 24 words', (t) => {
  const master = BIP85.fromBase58(rootKey);
  const child = master.deriveBIP39(0, 24, 0);

  t.plan(2);
  t.equal(
    child.toEntropy(),
    'ae131e2312cdc61331542efe0d1077bac5ea803adf24b313a4f0e48e9c51f37f',
  );
  t.equal(
    child.toMnemonic(),
    'puppy ocean match cereal symbol another shed magic wrap hammer bulb intact gadget divorce twin tonight reason outdoor destroy simple truth cigar social volcano',
  );
});

tape('works for HD-Seed WIF', (t) => {
  const master = BIP85.fromBase58(rootKey);
  const child = master.deriveWIF(0);

  t.plan(2);
  t.equal(
    child.toEntropy(),
    '7040bb53104f27367f317558e78a994ada7296c6fde36a364e5baf206e502bb1',
  );
  t.equal(
    child.toWIF(),
    'Kzyv4uF39d4Jrw2W7UryTHwZr1zQVNk4dAFyqE6BuMrMh1Za7uhp',
  );
});

tape('works for XPRV', (t) => {
  const master = BIP85.fromBase58(rootKey);
  const child = master.deriveXPRV(0);

  t.plan(2);
  t.equal(
    child.toEntropy(),
    'ead0b33988a616cf6a497f1c169d9e92562604e38305ccd3fc96f2252c177682',
  );
  t.equal(
    child.toXPRV(),
    'xprv9s21ZrQH143K2srSbCSg4m4kLvPMzcWydgmKEnMmoZUurYuBuYG46c6P71UGXMzmriLzCCBvKQWBUv3vPB3m1SATMhp3uEjXHJ42jFg7myX',
  );
});

tape('works for HEX', (t) => {
  const master = BIP85.fromBase58(rootKey);
  const child = master.deriveHex(64, 0);

  t.plan(1);
  t.equal(
    child.toEntropy(),
    '492db4698cf3b73a5a24998aa3e9d7fa96275d85724a91e71aa2d645442f878555d078fd1f1f67e368976f04137b1f7a0d19232136ca50c44614af72b5582a5c',
  );
});
