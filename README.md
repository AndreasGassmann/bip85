# BIP85

[![GitHub Action](https://github.com/AndreasGassmann/bip85/workflows/Build%20and%20Test/badge.svg)](https://github.com/AndreasGassmann/bip85/actions?query=workflow%3A%22Build+and+Test%22+branch%3Amain)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![npm](https://img.shields.io/npm/v/bip85.svg?colorB=brightgreen)](https://www.npmjs.com/package/bip85)

TypeScript/JavaScript implementation of [Bitcoin BIP85](https://github.com/bitcoin/bips/blob/master/bip-0085.mediawiki): Deterministic Entropy From BIP32 Keychains.

## Description

BIP85 allows you to derive entropy from a BIP32 root key, which can then be used in different wallets. If a child key is lost, it can easily be derived again by the master seed.

## Installation

```
npm install bip85
```

## Example

```typescript
// Derive a BIP39 mnemonic from a BIP32 root key

// Mnemonic: install scatter logic circle pencil average fall shoe quantum disease suspect usage
// BIP32 root key taken from the BIP85 specs
const xprv =
  'xprv9s21ZrQH143K2LBWUUQRFXhucrQqBpKdRRxNVq2zBqsx8HVqFk2uYo8kmbaLLHRdqtQpUm98uKfu3vca1LqdGhUtyoFnCNkfmXRyPXLjbKb';

const masterSeed = BIP85.fromBase58(xprv);

const language = 0; // English
const words = 12; // 12, 18 or 24
const index = 0; // Should be increased to derive multiple keys

const childSeed = masterSeed.deriveBIP39(language, words, index);

childSeed.toEntropy();
// 6250b68daf746d12a24d58b4787a714b

childSeed.toMnemonic();
// girl mad pet galaxy egg matter matrix prison refuse sense ordinary nose
```

For more examples, check the [examples](/examples/) folder or the [tests](/test/).

## Documentation

This library exports the `BIP85` class. The constructor accepts a `BIP32 node` from the `bip32` library. Alternatively, the class provides 4 static methods to initialize the `BIP85` class using a mnemonic, entropy, seed or bip32 root key.

The `fromMnemonic` method can be used to instantiate the `BIP85` class with a mnemonic.

```typescript
const mnemonic =
  'install scatter logic circle pencil average fall shoe quantum disease suspect usage';
const masterSeed = BIP85.fromMnemonic(mnemonic);
```

The `fromEntropy` method can be used to instantiate the `BIP85` class with raw entropy.

```typescript
const entropy = mnemonicToEntropy(mnemonic); // 75780e0e149a2a1f948e33af47e36b77
const masterSeed = BIP85.fromEntropy(entropy);
```

The `fromSeed` method can be used to instantiate the `BIP85` class with a BIP32 root key in buffer format.

```typescript
const seed = mnemonicToSeedSync(mnemonic);
const masterSeed = BIP85.fromSeed(seed);
```

The `fromBase58` method can be used to instantiate the `BIP85` class with a BIP32 root key in xprv format.

```typescript
const masterSeed = BIP85.fromBase58(
  'xprv9s21ZrQH143K2LBWUUQRFXhucrQqBpKdRRxNVq2zBqsx8HVqFk2uYo8kmbaLLHRdqtQpUm98uKfu3vca1LqdGhUtyoFnCNkfmXRyPXLjbKb',
);
```

All `masterSeed` variables are equivalent.

The `BIP85` class provides different methods to derive entropy. The generic `derive` method returns a string (entropy). If you use one of the specific derive methods, it will instead return a `BIP85Child` instance, which can then return the raw entropy or an application specific format.

### `derive(path, bytes?)`

`path`: The derivation path used to derive entropy
`bytes`: Length of the entropy. Default (and maximum): 64

Returns the entropy as a string.

```typescript
const child = masterSeed.derive(`m/83696968'/0'/0'`);
// efecfbccffea313214232d29e71563d941229afb4338c21f9517c41aaa0d16f00b83d2a09ef747e7a64e8e2bd5a14869e693da66ce94ac2da570ab7ee48618f7
```

### `deriveBIP39(language, wordLength, index)`

`language`: A number between 0 and 8, depending on the language
`wordLength`: 12, 18 or 24, the length of the mnemonic
`index`: starting at 0

Returns a `BIP85Child` instance. You can use the methods `toEntropy()` and `toMnemonic()`.

```typescript
const child = masterSeed.deriveBIP39(0, 12, 0);
child.toEntropy(); // 6250b68daf746d12a24d58b4787a714b
child.toMnemonic(); // girl mad pet galaxy egg matter matrix prison refuse sense ordinary nose
```

### `deriveWIF(index)`

`index`: starting at 0

Returns a `BIP85Child` instance. You can use the methods `toEntropy()` and `toWIF()`.

```typescript
const child = masterSeed.deriveWIF(0);
child.toEntropy(); // 7040bb53104f27367f317558e78a994ada7296c6fde36a364e5baf206e502bb1
child.toWIF(); // Kzyv4uF39d4Jrw2W7UryTHwZr1zQVNk4dAFyqE6BuMrMh1Za7uhp
```

### `deriveXPRV(index)`

`index`: starting at 0

Returns a `BIP85Child` instance. You can use the methods `toEntropy()` and `toXPRV()`.

```typescript
const child = masterSeed.deriveXPRV(0);
child.toEntropy(); // ead0b33988a616cf6a497f1c169d9e92562604e38305ccd3fc96f2252c177682
child.toXPRV(); // xprv9s21ZrQH143K2srSbCSg4m4kLvPMzcWydgmKEnMmoZUurYuBuYG46c6P71UGXMzmriLzCCBvKQWBUv3vPB3m1SATMhp3uEjXHJ42jFg7myX
```

### `deriveHex(bytes, index?)`

`bytes`: Length of the entropy, between 16 and 64
`index`: starting at 0

Returns a `BIP85Child` instance. You can use the method `toEntropy()`.

```typescript
const child = masterSeed.deriveHex(64);
child.toEntropy(); // 492db4698cf3b73a5a24998aa3e9d7fa96275d85724a91e71aa2d645442f878555d078fd1f1f67e368976f04137b1f7a0d19232136ca50c44614af72b5582a5c
```

### DRNG (Deterministic Random Number Generator)

`BIP85DRNG` uses SHAKE256 seeded with 64 bytes of BIP85-derived entropy to produce a deterministic stream of random bytes.

```typescript
import { BIP85, BIP85DRNG } from 'bip85';

const master = BIP85.fromBase58(xprv);
const entropyHex = master.derive("m/83696968'/0'/0'");
const entropy = hexToBytes(entropyHex); // 64 bytes
const drng = BIP85DRNG.fromEntropy(entropy);

drng.read(32); // 32 random bytes
drng.read(64); // next 64 random bytes (continues the stream)
```

### Ripple Seed

`entropyToCrippleSeed` converts BIP85-derived entropy into a Ripple-compatible seed.

```typescript
import { BIP85, entropyToCrippleSeed } from 'bip85';

const master = BIP85.fromBase58(xprv);
const entropy = master.derive("m/574946'/0'");
entropyToCrippleSeed(entropy); // ssyKPX1uyL4mTpba6hHDRTX2Cj6gT
```

### Monero Seed

`entropyToMoneroMnemonic` converts BIP85-derived entropy into a 25-word Monero mnemonic seed phrase.

```typescript
import { BIP85, entropyToMoneroMnemonic } from 'bip85';

const master = BIP85.fromBase58(xprv);
const entropy = master.derive("m/83696968'/12839'/25'/0'");
entropyToMoneroMnemonic(entropy, 32);
// paradise wield himself fungal jive wept faked pitched pebbles lymph suitcase foxes lifestyle jagged navy around rally when apart exotic virtual joyous austere nightly wept
```

## Testing

```bash
npm install
npm test
```

## Dependencies

We try to use only a minimal set of dependencies to reduce the attack surface of malicious code being added by one of those dependencies.

There are 6 (non-dev) dependencies:

- [@noble/hashes](https://www.npmjs.com/package/@noble/hashes)
- [bip32](https://www.npmjs.com/package/bip32)
- [bip39](https://www.npmjs.com/package/bip39)
- [tiny-secp256k1](https://www.npmjs.com/package/tiny-secp256k1)
- [uint8array-tools](https://www.npmjs.com/package/uint8array-tools)
- [wif](https://www.npmjs.com/package/wif)

## Credits

The project setup has been inspired by multiple bitcoinjs libraries, such as [bip32](https://www.npmjs.com/package/bip32) and [bip39](https://www.npmjs.com/package/bip39).

## LICENSE

MIT
