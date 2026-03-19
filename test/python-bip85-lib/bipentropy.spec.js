import tape from 'tape';
import { BIP85 } from '../../src/index.js';

// Test vectors taken from python library: https://github.com/ethankosakovsky/bip85/blob/master/bip85/tests/test_bip85.py

// Mnemonic: install scatter logic circle pencil average fall shoe quantum disease suspect usage
const rootKey =
  'xprv9s21ZrQH143K2LBWUUQRFXhucrQqBpKdRRxNVq2zBqsx8HVqFk2uYo8kmbaLLHRdqtQpUm98uKfu3vca1LqdGhUtyoFnCNkfmXRyPXLjbKb';
const mnemonic =
  'install scatter logic circle pencil average fall shoe quantum disease suspect usage';

tape('works for python library test: mnemonic to entropy', (t) => {
  const master = BIP85.fromBase58(rootKey);
  const childEntropy = master.derive("m/83696968'/0'/0'");

  t.plan(1);
  t.equal(
    childEntropy,
    'efecfbccffea313214232d29e71563d941229afb4338c21f9517c41aaa0d16f00b83d2a09ef747e7a64e8e2bd5a14869e693da66ce94ac2da570ab7ee48618f7',
  );
});

tape('works for python library test: HEX 1', (t) => {
  const master = BIP85.fromBase58(rootKey);
  const child = master.deriveHex(32, 0);

  t.plan(1);
  t.equal(
    child.toEntropy(),
    'ea3ceb0b02ee8e587779c63f4b7b3a21e950a213f1ec53cab608d13e8796e6dc',
  );
});

tape('works for python library test: HEX 2', (t) => {
  const master = BIP85.fromBase58(rootKey);
  const child = master.deriveHex(64, 0);

  t.plan(1);
  t.equal(
    child.toEntropy(),
    '492db4698cf3b73a5a24998aa3e9d7fa96275d85724a91e71aa2d645442f878555d078fd1f1f67e368976f04137b1f7a0d19232136ca50c44614af72b5582a5c',
  );
});

tape('works for python library test: HEX 3', (t) => {
  const master = BIP85.fromBase58(rootKey);
  const child = master.deriveHex(64, 1234);

  t.plan(1);
  t.equal(
    child.toEntropy(),
    '61d3c182f7388268463ef327c454a10bc01b3992fa9d2ee1b3891a6b487a5248793e61271066be53660d24e8cb76ff0cfdd0e84e478845d797324c195df9ab8e',
  );
});

tape('works for python library test: mnemonic with password', (t) => {
  const master = BIP85.fromMnemonic(mnemonic, 'TREZOR');
  const childEntropy = master.derive("m/83696968'/0'/0'");

  t.plan(1);
  t.equal(
    childEntropy,
    'd24cee04c61c4a47751658d078ae9b0cc9550fe43eee643d5c10ac2e3f5edbca757b2bd74d55ff5bcc2b1608d567053660d9c7447ae1eb84b6619282fd391844',
  );
});
