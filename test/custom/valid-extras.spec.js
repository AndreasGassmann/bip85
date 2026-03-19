import tape from 'tape';
import {
  BIP85,
  entropyToCrippleSeed,
  entropyToMoneroMnemonic,
} from '../../src/index.js';

const rootKey =
  'xprv9s21ZrQH143K2LBWUUQRFXhucrQqBpKdRRxNVq2zBqsx8HVqFk2uYo8kmbaLLHRdqtQpUm98uKfu3vca1LqdGhUtyoFnCNkfmXRyPXLjbKb';

tape('works for Cripple (Ripple) seed derivation', (t) => {
  const master = BIP85.fromBase58(rootKey);
  const entropy = master.derive("m/574946'/0'");
  const result = entropyToCrippleSeed(entropy);

  t.strictEqual(result, 'ssyKPX1uyL4mTpba6hHDRTX2Cj6gT');

  t.end();
});

tape('works for Monero seed derivation', (t) => {
  const master = BIP85.fromBase58(rootKey);
  const entropy = master.derive("m/83696968'/12839'/25'/0'");
  const result = entropyToMoneroMnemonic(entropy, 32);

  t.strictEqual(
    result,
    'paradise wield himself fungal jive wept faked pitched pebbles lymph suitcase foxes lifestyle jagged navy around rally when apart exotic virtual joyous austere nightly wept',
  );

  t.end();
});
