const BIP85 = require('../..').BIP85;
const tape = require('tape');

// Root seed taken from: https://github.com/bitcoin/bips/blob/master/bip-0085.mediawiki#applications

const testCases = [
  {
    length: 16,
    index: undefined,
    entropy: '3c678a761e24067fecc41c328a3d253d',
  },
  {
    length: 16,
    index: 0,
    entropy: '3c678a761e24067fecc41c328a3d253d',
  },
  {
    length: 16,
    index: 1,
    entropy: 'c8513d24fefd97eeccaf9acacea3a452',
  },
  {
    length: 16,
    index: 2,
    entropy: '7a2d7e9acb6ef33cd730bd9f8be2cdde',
  },
  {
    length: 32,
    index: 0,
    entropy: 'ea3ceb0b02ee8e587779c63f4b7b3a21e950a213f1ec53cab608d13e8796e6dc',
  },
  {
    length: 64,
    index: 0,
    entropy:
      '492db4698cf3b73a5a24998aa3e9d7fa96275d85724a91e71aa2d645442f878555d078fd1f1f67e368976f04137b1f7a0d19232136ca50c44614af72b5582a5c',
  },
];

const rootKey =
  'xprv9s21ZrQH143K2LBWUUQRFXhucrQqBpKdRRxNVq2zBqsx8HVqFk2uYo8kmbaLLHRdqtQpUm98uKfu3vca1LqdGhUtyoFnCNkfmXRyPXLjbKb';

testCases.forEach((testCase) => {
  tape(`works for HEX, index: ${testCase.index}`, (t) => {
    const master = BIP85.fromBase58(rootKey);

    const child = master.deriveHex(testCase.length, testCase.index);

    t.plan(1);
    t.equal(child.toEntropy(), testCase.entropy);
  });
});

tape(`works for HEX, empty index is 0`, (t) => {
  const master = BIP85.fromBase58(rootKey);

  const child = master.deriveHex(16, 0);
  const childNoIndex = master.deriveHex(16);

  t.plan(2);
  t.equal(child.toEntropy(), '3c678a761e24067fecc41c328a3d253d');
  t.equal(childNoIndex.toEntropy(), '3c678a761e24067fecc41c328a3d253d');
});
