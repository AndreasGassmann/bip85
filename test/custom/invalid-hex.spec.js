const BIP85 = require('../..').BIP85;
const tape = require('tape');

// Mnemonic: civil purpose bubble rubber carry crazy deposit text switch unhappy blush wrist

const rootKey =
  'xprv9s21ZrQH143K2PepkeoHKihXZtYwmLFHC73kphRHo2Rg6PCQrmdXxq5N5D3FN9RXd1YGTv8AM57jSDoDXFv5AxLddRBGD2AjtFd7eUnybb7';

tape('does not work for invalid HEX parameters', (t) => {
  const master = BIP85.fromBase58(rootKey);

  const invalidBytesLength = {};
  const invalidIndex = {};

  t.plan(2);
  t.throws(
    () => {
      master.deriveHex(invalidBytesLength, 0);
      t.fail('should have failed');
    },
    new RegExp('HEX invalid byte length type'),
    `HEX byte length "${invalidBytesLength}" is wrong type`,
  );
  t.throws(
    () => {
      master.deriveHex(32, invalidIndex);
      t.fail('should have failed');
    },
    new RegExp('HEX invalid index'),
    `HEX index "${invalidIndex}" is wrong type`,
  );
});

tape('does not work for invalid HEX byte length', (t) => {
  const master = BIP85.fromBase58(rootKey);

  const tests = [
    -1,
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    // 16..64
    65,
    66,
    67,
    68,
    69,
    70,
  ];

  t.plan(tests.length);
  tests.forEach((el) => {
    t.throws(
      () => {
        master.deriveHex(el, 0);
        t.fail('should have failed');
      },
      new RegExp('HEX invalid byte length'),
      `HEX byte length "${el}" is invalid`,
    );
  });
});
