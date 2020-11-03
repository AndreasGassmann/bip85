const BIP85 = require('..').BIP85;
const tape = require('tape');

// Root seed taken from: https://github.com/bitcoin/bips/blob/master/bip-0085.mediawiki#applications

const testCases = [
  {
    language: 0,
    words: 12,
    index: 0,
    entropy: '6250b68daf746d12a24d58b4787a714b',
  },
  {
    language: 1,
    words: 12,
    index: 0,
    entropy: '2536954d9c7b38f2b3a70e8aab996381',
  },
  {
    language: 2,
    words: 12,
    index: 0,
    entropy: '586cad146750dd1eb77ff24ebb265562',
  },
  {
    language: 3,
    words: 12,
    index: 0,
    entropy: '2803a8a0028a63d92af53687b5fabeb6',
  },
  {
    language: 4,
    words: 12,
    index: 0,
    entropy: '20d11530ad4f6a09e74258a09bc7744a',
  },
  {
    language: 5,
    words: 12,
    index: 0,
    entropy: 'f135d87a7b772b2d650ffeecada6651b',
  },

  {
    language: 6,
    words: 12,
    index: 0,
    entropy: '770deeb5d87ef0a2b11c1c0ca3e5dc6e',
  },
  {
    language: 7,
    words: 12,
    index: 0,
    entropy: 'd292332fe6cd6ef43ddbd86f5be5c25c',
  },
  {
    language: 8,
    words: 12,
    index: 0,
    entropy: '1a7661722ad4fb4c794f987d70947bc3',
  },
  {
    language: 0,
    words: 18,
    index: 0,
    entropy: '938033ed8b12698449d4bbca3c853c66b293ea1b1ce9d9dc',
  },
  {
    language: 0,
    words: 24,
    index: 0,
    entropy: 'ae131e2312cdc61331542efe0d1077bac5ea803adf24b313a4f0e48e9c51f37f',
  },
  {
    language: 0,
    words: 12,
    index: undefined,
    entropy: '6250b68daf746d12a24d58b4787a714b',
  },
  {
    language: 0,
    words: 12,
    index: 1,
    entropy: '92644a63628d3d3865daa14822aba21a',
  },
  {
    language: 0,
    words: 12,
    index: 2,
    entropy: 'ba4d0a9f070dbc018c60238bb6498472',
  },
  {
    language: 0,
    words: 12,
    index: 3,
    entropy: '7b3bdde419f0cc5930ee474b388355cb',
  },
];

const rootKey =
  'xprv9s21ZrQH143K2LBWUUQRFXhucrQqBpKdRRxNVq2zBqsx8HVqFk2uYo8kmbaLLHRdqtQpUm98uKfu3vca1LqdGhUtyoFnCNkfmXRyPXLjbKb';

testCases.forEach((testCase) => {
  tape(
    `works for BIP39, language: ${testCase.language}, words: ${testCase.words}, index: ${testCase.index}`,
    (t) => {
      const master = BIP85.fromBase58(rootKey);

      const entropy = master.deriveBIP39(
        testCase.language,
        testCase.words,
        testCase.index,
      );

      t.plan(1);
      t.equal(entropy.toString('hex'), testCase.entropy);
    },
  );
});

tape(`works for BIP39, empty index is 0`, (t) => {
  const master = BIP85.fromBase58(rootKey);

  const entropy = master.deriveBIP39(0, 12, 0);
  const entropyNoIndex = master.deriveBIP39(0, 12);

  t.plan(2);
  t.equal(entropy.toString('hex'), '6250b68daf746d12a24d58b4787a714b');
  t.equal(entropyNoIndex.toString('hex'), '6250b68daf746d12a24d58b4787a714b');
});
