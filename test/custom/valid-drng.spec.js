import tape from 'tape';
import { BIP85, BIP85DRNG } from '../../src/index.js';

const rootKey =
  'xprv9s21ZrQH143K2LBWUUQRFXhucrQqBpKdRRxNVq2zBqsx8HVqFk2uYo8kmbaLLHRdqtQpUm98uKfu3vca1LqdGhUtyoFnCNkfmXRyPXLjbKb';

function hexToBytes(hex) {
  return new Uint8Array(hex.match(/.{2}/g).map((b) => parseInt(b, 16)));
}

function bytesToHex(bytes) {
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

tape('DRNG produces correct output from entropy', (t) => {
  const master = BIP85.fromBase58(rootKey);
  const entropyHex = master.derive("m/83696968'/0'/0'");
  const entropy = hexToBytes(entropyHex);
  const drng = BIP85DRNG.fromEntropy(entropy);

  const r1 = drng.read(50);
  t.strictEqual(
    bytesToHex(r1),
    'b78b1ee6b345eae6836c2d53d33c64cdaf9a696487be81b03e822dc84b3f1cd883d7559e53d175f243e4c349e822a957bbff',
    'first read of 50 bytes matches',
  );

  const r2 = drng.read(100);
  t.strictEqual(
    bytesToHex(r2),
    '9224bc5dde9492ef54e8a439f6bc8c7355b87a925a37ee405a7502991111cd2dddaf1883f4e962abf4fb4b31cd28d5cf6b14f6ddcc9c19fd56d7f960a4b27f1d423a55dda4865aa6ddd6b4c26f18d400bb0a593e6c785d6d7e28c9c64608624318eddc01',
    'second read of 100 bytes matches',
  );

  t.end();
});

tape('DRNG is deterministic regardless of read order', (t) => {
  const master = BIP85.fromBase58(rootKey);
  const entropyHex = master.derive("m/83696968'/0'/0'");
  const entropy = hexToBytes(entropyHex);

  const drng1 = BIP85DRNG.fromEntropy(entropy);
  const drng2 = BIP85DRNG.fromEntropy(entropy);
  const drng3 = BIP85DRNG.fromEntropy(entropy);

  const result1 =
    bytesToHex(drng1.read(10)) +
    bytesToHex(drng1.read(20)) +
    bytesToHex(drng1.read(30)) +
    bytesToHex(drng1.read(40));
  const result2 =
    bytesToHex(drng2.read(40)) +
    bytesToHex(drng2.read(30)) +
    bytesToHex(drng2.read(20)) +
    bytesToHex(drng2.read(10));
  const result3 = bytesToHex(drng3.read(100));

  t.strictEqual(result1, result2, 'different read orders produce same output');
  t.strictEqual(result2, result3, 'single read matches split reads');

  t.end();
});

tape('DRNG produces correct lengths', (t) => {
  const master = BIP85.fromBase58(rootKey);
  const entropyHex = master.derive("m/83696968'/0'/0'");
  const entropy = hexToBytes(entropyHex);
  const drng = BIP85DRNG.fromEntropy(entropy);

  t.strictEqual(drng.read(1).length, 1);
  t.strictEqual(drng.read(10).length, 10);
  t.strictEqual(drng.read(100).length, 100);
  t.strictEqual(drng.read(1000).length, 1000);
  t.strictEqual(drng.read(10000).length, 10000);

  t.end();
});

tape('DRNG rejects invalid entropy', (t) => {
  t.throws(
    () => BIP85DRNG.fromEntropy(new Uint8Array(32)),
    /exactly 512 bits/,
    'rejects entropy shorter than 64 bytes',
  );

  t.throws(
    () => BIP85DRNG.fromEntropy(new Uint8Array(0)),
    /exactly 512 bits/,
    'rejects empty entropy',
  );

  t.end();
});
