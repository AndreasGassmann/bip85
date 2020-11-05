const BIP85 = require('../..').BIP85;
const tape = require('tape');

// Mnemonic: civil purpose bubble rubber carry crazy deposit text switch unhappy blush wrist

tape('does not work with child node (xprv)', (t) => {
  const accountKey =
    'xprvA2DaXt5LZKtjkD1GmGAVkjtY6CkrQN8XCGVSxmdxjaoR9Am2qQYcwn5rg4bWvqxNdFEMmshynTdRLAwQVfHm6aNyhdBeDbRhsfZ5HGgN7Vx';

  t.plan(1);
  t.throws(() => {
    BIP85.fromBase58(accountKey);
    t.fail('should have failed');
  }, new RegExp('Expected master, got child'));
});

tape('does not work with child node (xpub)', (t) => {
  const accountKey =
    'xpub6FCvwPcEPhT2xh5jsHhW7sqGeEbLoprNZVR3mA3aHvLQ1y6BNwrsVaQLXPGUU1sWu3MYEFEkzxQYubThZAuR8qQEX74Q2wQHcSSXZqk7BW1';

  t.plan(1);
  t.throws(() => {
    BIP85.fromBase58(accountKey);
    t.fail('should have failed');
  }, new RegExp('Expected master, got child'));
});

tape('does not work for invalid root key', (t) => {
  const invalidRootKey = 'asdf';

  t.plan(1);
  t.throws(() => {
    BIP85.fromBase58(invalidRootKey);
    t.fail('should have failed');
  }, new RegExp('Invalid checksum'));
});
