const BIP85 = require('..').BIP85;
const tape = require('tape');

// Mnemonic: civil purpose bubble rubber carry crazy deposit text switch unhappy blush wrist

const rootKey =
  'xprv9s21ZrQH143K2PepkeoHKihXZtYwmLFHC73kphRHo2Rg6PCQrmdXxq5N5D3FN9RXd1YGTv8AM57jSDoDXFv5AxLddRBGD2AjtFd7eUnybb7';

tape('does not work for invalid WIF parameters', (t) => {
  const master = BIP85.fromBase58(rootKey);

  const invalidIndex = {};

  t.plan(1);
  t.throws(
    () => {
      master.deriveHDSeedWIF(invalidIndex);
      t.fail('should have failed');
    },
    new RegExp('WIF invalid index'),
    `WIF index "${invalidIndex}" is wrong type`,
  );
});
