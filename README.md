# BIP85

![GitHub Action](https://github.com/AndreasGassmann/bip85/workflows/Build%2C%20Test%20and%20Analyze/badge.svg)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=AndreasGassmann_bip85&metric=alert_status)](https://sonarcloud.io/dashboard?id=AndreasGassmann_bip85)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=AndreasGassmann_bip85&metric=coverage)](https://sonarcloud.io/dashboard?id=AndreasGassmann_bip85)

TypeScript/JavaScript implementation of [Bitcoin BIP85](https://github.com/bitcoin/bips/blob/master/bip-0085.mediawiki): Deterministic Entropy From BIP32 Keychains

# DISCLAIMER

This project is in an early development phase and has not been audited or reviewed. Use it at your own risk.

## Description

BIP85 allows you to derive entropy from a BIP32 root key, which can then be used in different wallets. If a child key is lost, it can easily be derived again by the master seed.

## Installation

```
npm install bip85
```

## Documentation

This library exports the `BIP85` class. The constructor of accepts a `BIP32 node` from the `bip32` library. Alternatively, the class provides 4 static methods to initialize the `BIP85` class using a mnemonic, entropy, seed or bip32 root key.

The `fromMnemonic` method can be used to instantiate the `BIP85` class with a mnemonic.

```typescript
const mnemonic =
  'install scatter logic circle pencil average fall shoe quantum disease suspect usage'; // Mnemonic
const masterSeed = BIP85.fromMnemonic(mnemonic);
```

The `fromEntropy` method can be used to instantiate the `BIP85` class with raw entropy.

```typescript
const entropy = mnemonicToEntropy(mnemonic); // 75780e0e149a2a1f948e33af47e36b77
const masterSeed = BIP85.fromEntropy(entropy);
```

The `fromSeed` method can be used to instantiate the `BIP85` class with a BIP32 root key in buffer format.

```typescript
const seed = mnemonicToSeedSync(mnemonic); // <Buffer 37 48 34 72 a6 af 7f d1 07 fb 5f 5a aa a7 bd dc 89 69 03 53 36 92 29 77 1c 32 81 2f 71 12 07 c8 73 98 a8 d4 4c fc 76 3a 81 85 ff 34 62 72 e8 f1 45 51 ... 14 more bytes>
const masterSeed = BIP85.fromSeed(seed);
```

The `fromBase58` method can be used to instantiate the `BIP85` class with a BIP32 root key in xprv format.

```typescript
const base58 = fromSeed(seed).toBase58(); // xprv9s21ZrQH143K2LBWUUQRFXhucrQqBpKdRRxNVq2zBqsx8HVqFk2uYo8kmbaLLHRdqtQpUm98uKfu3vca1LqdGhUtyoFnCNkfmXRyPXLjbKb
const masterSeed = BIP85.fromBase58(base58);
```

All `masterSeed` variables are equivalent.

The `BIP85` class provides different methods to derive entropy. The generic `derive` method returns a string (entropy). If you use one of the specific derive method, it will instead return a `BIP85Child` instance, which can then return the raw entropy or an application specific format.

The `derive` method accepts 3 parameters.

`path`: A number between 0 and 8, depending on the language
`bytes`: Length of the entropy. Default (and maximum): 64

Returns the entropy as a string.

```typescript
const path = `m/83696968'/0'/0'`;

const child = masterSeed.derive(path);
child; // efecfbccffea313214232d29e71563d941229afb4338c21f9517c41aaa0d16f00b83d2a09ef747e7a64e8e2bd5a14869e693da66ce94ac2da570ab7ee48618f7
```

The `deriveBIP39` method accepts 3 parameters.

`language`: A number between 0 and 8, depending on the language
`wordLength`: 12, 18 or 24, the length of the mnemonic
`index`: starting at 0

Returns a `BIP85Child` instance. You can use the methods `toEntropy()` and `toMnemonic()`.

```typescript
const language = 0;
const wordLength = 12;
const index = 0;

const child = masterSeed.deriveBIP39(language, wordLength, index);
child.toEntropy(); // 6250b68daf746d12a24d58b4787a714b
child.toMnemonic(); // girl mad pet galaxy egg matter matrix prison refuse sense ordinary nose
```

The `deriveWIF` method accepts 1 parameter.

`index`: starting at 0

Returns a `BIP85Child` instance. You can use the methods `toEntropy()` and `toWIF()`.

```typescript
const index = 0;

const child = masterSeed.deriveWIF(index);
child.toEntropy(); // 7040bb53104f27367f317558e78a994ada7296c6fde36a364e5baf206e502bb1
child.toWIF(); // Kzyv4uF39d4Jrw2W7UryTHwZr1zQVNk4dAFyqE6BuMrMh1Za7uhp
```

The `deriveXPRV` method accepts 1 parameter.

`index`: starting at 0

Returns a `BIP85Child` instance. You can use the methods `toEntropy()` and `toXPRV()`.

```typescript
const index = 0;

const child = masterSeed.deriveXPRV(index);
child.toEntropy(); // ead0b33988a616cf6a497f1c169d9e92562604e38305ccd3fc96f2252c177682
child.toXPRV(); // xprv9s21ZrQH143K2srSbCSg4m4kLvPMzcWydgmKEnMmoZUurYuBuYG46c6P71UGXMzmriLzCCBvKQWBUv3vPB3m1SATMhp3uEjXHJ42jFg7myX
```

The `deriveHex` method accepts 1 parameter.

`bytes`: Length of the entropy, between 16 and 64

Returns a `BIP85Child` instance. You can use the method `toEntropy()`.

```typescript
const bytes = 64;

const child = masterSeed.deriveHex(bytes);
child.toEntropy(); // 492db4698cf3b73a5a24998aa3e9d7fa96275d85724a91e71aa2d645442f878555d078fd1f1f67e368976f04137b1f7a0d19232136ca50c44614af72b5582a5c
```

## Example

```typescript
// Derive a BIP39 mnemonic from a BIP32 root key

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

## Testing

```bash

npm install
npm test

---------------|---------|----------|---------|---------|-------------------
File           | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
---------------|---------|----------|---------|---------|-------------------
All files      |   86.92 |    81.63 |   80.95 |   87.62 |
 BIP85.js      |   84.85 |    84.62 |      75 |   84.85 | 97-112
 BIP85Child.js |    87.5 |     62.5 |     100 |    87.5 | 23,29,36
 crypto.js     |     100 |      100 |     100 |     100 |
 index.js      |    87.5 |      100 |      50 |     100 |
 util.js       |     100 |      100 |     100 |     100 |
---------------|---------|----------|---------|---------|-------------------

```

## TODOs

- [ ] Add more tests
- [ ] Fix sonarsource coverage not working
- [ ] 100% test coverage
- [ ] Add more examples
- [ ] Migrate tests to use typescript
- [ ] Add changelog
- [ ] Audit/review of library by 3rd party

## Dependencies

We try to use only a minimal set of dependencies to reduce the attack surface of malicious code being added by one of those dependencies.

There are only 4 (non-dev) dependencies:

- [bip32](https://www.npmjs.com/package/bip32)
- [bip39](https://www.npmjs.com/package/bip39)
- [create-hmac](https://www.npmjs.com/package/create-hmac)
- [wif](https://www.npmjs.com/package/wif)

3 of those repositories are owned by the [bitcoinjs](https://github.com/bitcoinjs) organization, one of them is managed by [crypto-browserify](https://github.com/crypto-browserify)

## Credits

The project setup has been inspired by multiple bitcoinjs libraries, such as [bip32](https://www.npmjs.com/package/bip32) and [bip39](https://www.npmjs.com/package/bip39).

## LICENSE

MIT
