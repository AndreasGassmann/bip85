const BIP85 = require('..').BIP85;
const tape = require('tape');

// Mnemonic: civil purpose bubble rubber carry crazy deposit text switch unhappy blush wrist

const rootKey =
  'xprv9s21ZrQH143K2PepkeoHKihXZtYwmLFHC73kphRHo2Rg6PCQrmdXxq5N5D3FN9RXd1YGTv8AM57jSDoDXFv5AxLddRBGD2AjtFd7eUnybb7';

tape('does not work for BIP39 with invalid word lengths', (t) => {
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
    // 12,
    13,
    14,
    15,
    16,
    17,
    // 18,
    19,
    20,
    21,
    22,
    23,
    // 24,
    25,
    26,
    27,
    28,
    29,
    30,
    21,
    32,
    48,
  ];

  t.plan(tests.length);
  tests.forEach((el) => {
    t.throws(
      () => {
        master.deriveBIP39(0, el, 0);
        t.fail('should have failed');
      },
      new RegExp('BIP39 invalid mnemonic length'),
      `"${el}" is invalid mnemonic length`,
    );
  });
});

tape('does not work for BIP39 with invalid languages', (t) => {
  const rootKey =
    'xprv9s21ZrQH143K2PepkeoHKihXZtYwmLFHC73kphRHo2Rg6PCQrmdXxq5N5D3FN9RXd1YGTv8AM57jSDoDXFv5AxLddRBGD2AjtFd7eUnybb7';

  const master = BIP85.fromBase58(rootKey);

  const tests = [
    -1,
    // 0,
    // 1,
    // 2,
    // 3,
    // 4,
    // 5,
    // 6,
    // 7,
    // 8,
    9,
    10,
    11,
    12,
  ];

  t.plan(tests.length);
  tests.forEach((el) => {
    t.throws(
      () => {
        master.deriveBIP39(el, 24, 0);
        t.fail('should have failed');
      },
      new RegExp('BIP39 invalid language'),
      `"${el}" is invalid language`,
    );
  });
});

tape('does not work for invalid input type', (t) => {
  const master = BIP85.fromBase58(rootKey);

  const invalidLanguage = {};
  const invalidLength = {};
  const invalidIndex = {};

  t.plan(3);
  t.throws(
    () => {
      master.deriveBIP39(invalidLanguage, 12, 0);
      t.fail('should have failed');
    },
    new RegExp('BIP39 invalid language type'),
    `BIP39 language "${invalidLanguage}" is wrong type`,
  );
  t.throws(
    () => {
      master.deriveBIP39(0, invalidLength, 0);
      t.fail('should have failed');
    },
    new RegExp('BIP39 invalid mnemonic length'),
    `BIP39 word length "${invalidLength}" is wrong type`,
  );
  t.throws(
    () => {
      master.deriveBIP39(0, 12, invalidIndex);
      t.fail('should have failed');
    },
    new RegExp('BIP39 invalid index'),
    `BIP39 index "${invalidIndex}" is wrong type`,
  );
});
