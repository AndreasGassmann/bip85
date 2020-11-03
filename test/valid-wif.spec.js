const BIP85 = require('..').BIP85;
const tape = require('tape');

// Root seed taken from: https://github.com/bitcoin/bips/blob/master/bip-0085.mediawiki#applications

const testCases = [
  {
    index: undefined,
    entropy: '7040bb53104f27367f317558e78a994ada7296c6fde36a364e5baf206e502bb1',
  },
  {
    index: 0,
    entropy: '7040bb53104f27367f317558e78a994ada7296c6fde36a364e5baf206e502bb1',
  },
  {
    index: 1,
    entropy: 'ccc943df8b054bf0534a5159f8dcc44790b6e13a60c4832867173f9d01cd74a0',
  },
  {
    index: 2,
    entropy: 'e1e44e7b6cd40fd6e5e869af76daa7f7cabe113f0142a3d6ae927b62cc3808b0',
  },
];

const rootKey =
  'xprv9s21ZrQH143K2LBWUUQRFXhucrQqBpKdRRxNVq2zBqsx8HVqFk2uYo8kmbaLLHRdqtQpUm98uKfu3vca1LqdGhUtyoFnCNkfmXRyPXLjbKb';

testCases.forEach((testCase) => {
  tape(`works for WIF, index: ${testCase.index}`, (t) => {
    const master = BIP85.fromBase58(rootKey);

    const entropy = master.deriveHDSeedWIF(testCase.index);

    t.plan(1);
    t.equal(entropy.toString('hex'), testCase.entropy);
  });
});

tape(`works for WIF, empty index is 0`, (t) => {
  const master = BIP85.fromBase58(rootKey);

  const entropy = master.deriveHDSeedWIF(0);
  const entropyNoIndex = master.deriveHDSeedWIF();

  t.plan(2);
  t.equal(
    entropy.toString('hex'),
    '7040bb53104f27367f317558e78a994ada7296c6fde36a364e5baf206e502bb1',
  );
  t.equal(
    entropyNoIndex.toString('hex'),
    '7040bb53104f27367f317558e78a994ada7296c6fde36a364e5baf206e502bb1',
  );
});
