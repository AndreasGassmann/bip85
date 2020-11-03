const BIP85 = require('..').BIP85;
const tape = require('tape');

// Root seed taken from: https://github.com/bitcoin/bips/blob/master/bip-0085.mediawiki#applications

const testCases = [
  {
    index: undefined,
    entropy: 'ead0b33988a616cf6a497f1c169d9e92562604e38305ccd3fc96f2252c177682',
  },
  {
    index: 0,
    entropy: 'ead0b33988a616cf6a497f1c169d9e92562604e38305ccd3fc96f2252c177682',
  },
  {
    index: 1,
    entropy: '68bb25bc3d0b62b6adedf32b3cbf7b64c406f16704d89c76cc4a1a303510944a',
  },
  {
    index: 2,
    entropy: '8d2ef92e33d5b02f646e8cd2a2e3d7f425ce001856d6e8720e6137cd7f4fae5f',
  },
];

const rootKey =
  'xprv9s21ZrQH143K2LBWUUQRFXhucrQqBpKdRRxNVq2zBqsx8HVqFk2uYo8kmbaLLHRdqtQpUm98uKfu3vca1LqdGhUtyoFnCNkfmXRyPXLjbKb';

testCases.forEach((testCase) => {
  tape(`works for XPRV, index: ${testCase.index}`, (t) => {
    const master = BIP85.fromBase58(rootKey);

    const entropy = master.deriveXPRV(testCase.index);

    t.plan(1);
    t.equal(entropy.toString('hex'), testCase.entropy);
  });
});

tape(`works for XPRV, empty index is 0`, (t) => {
  const master = BIP85.fromBase58(rootKey);

  const entropy = master.deriveXPRV(0);
  const entropyNoIndex = master.deriveXPRV();

  t.plan(2);
  t.equal(
    entropy.toString('hex'),
    'ead0b33988a616cf6a497f1c169d9e92562604e38305ccd3fc96f2252c177682',
  );
  t.equal(
    entropyNoIndex.toString('hex'),
    'ead0b33988a616cf6a497f1c169d9e92562604e38305ccd3fc96f2252c177682',
  );
});
