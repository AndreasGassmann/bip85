# BIP85

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

TypeScript/JavaScript implementation of [Bitcoin BIP85](https://github.com/bitcoin/bips/blob/master/bip-0085.mediawiki): Deterministic Entropy From BIP32 Keychains

# DISCLAIMER

This project is in an early development phase and has not been audited or reviewed. Use it at your own risk.

## Description

BIP85 allows you to derive entropy from a BIP32 root key, which can then be used in different wallets. If a child key is lost, it can easily be derived again by the master seed.

## Installation

```
npm install bip85
```

## Examples

```typescript

// Derive a BIP39 mnemonic from a BIP32 root key

// BIP32 root key taken from the BIP85 specs
const xprv =
  'xprv9s21ZrQH143K2LBWUUQRFXhucrQqBpKdRRxNVq2zBqsx8HVqFk2uYo8kmbaLLHRdqtQpUm98uKfu3vca1LqdGhUtyoFnCNkfmXRyPXLjbKb';

const masterSeed = BIP85.fromBase58(xprv);

const language = 0 // English
const words = 12 // 12, 18 or 24
const index = 0 // Should be increased to derive multiple keys

const childSeed = masterSeed.deriveBIP39(language, words, index);

childSeed.toEntropy()
// 6250b68daf746d12a24d58b4787a714b

childSeed.toMnemonic()
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
All files      |   88.24 |    83.33 |   80.95 |      89 |                   
 BIP85.js      |   85.29 |    84.21 |      75 |   85.29 | 99-114            
 BIP85Child.js |   94.12 |       50 |     100 |   94.12 | 24                
 crypto.js     |     100 |      100 |     100 |     100 |                   
 index.js      |    87.5 |      100 |      50 |     100 |                   
 util.js       |     100 |      100 |     100 |     100 |                   
---------------|---------|----------|---------|---------|-------------------

```

## TODOs

- [ ] Add more tests
- [ ] Add build/quality badges
- [ ] Fix sonarsource coverage not working
- [ ] 100% test coverage
- [ ] Add more examples
- [ ] Migrate tests to use typescript
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