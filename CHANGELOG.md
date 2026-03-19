# Changelog

## 1.0.0

### Breaking Changes

- Migrated to ESM (dropped CommonJS support)
- Updated `bip32` to v5 (now uses factory pattern: `BIP32Factory(ecc)`)
- Updated `wif` to v5 (API changed to object-style `encode({ version, privateKey, compressed })`)
- Replaced `create-hmac` with `@noble/hashes`
- `Buffer` replaced with `Uint8Array` throughout

### New Features

- Added `BIP85DRNG` — Deterministic Random Number Generator using SHAKE256
- Added `entropyToCrippleSeed` — Ripple-compatible seed derivation
- Added `entropyToMoneroMnemonic` — Monero 25-word mnemonic seed derivation

### Dependency Updates

- `@noble/hashes` 2.0.1 (new, replaces `create-hmac`)
- `bip32` 2.0.6 → 5.0.1
- `bip39` 3.0.2 → 3.1.0
- `tiny-secp256k1` 2.2.4 (new)
- `uint8array-tools` 0.0.9 (new)
- `wif` 2.0.6 → 5.0.0
- `typescript` 4.x → 5.9
- `prettier` 2.x → 3.8
- `eslint` 10.x (new, replaces `tslint`)
- `c8` 11.x (new, replaces `nyc`)

### Other

- Migrated linter from tslint to eslint
- Migrated coverage from nyc to c8
- Updated GitHub Actions to v4 with Node 24
- Added npm publish workflow with provenance
- Removed SonarCloud integration

## 0.0.3

- Add helper methods to work with seeds and mnemonics
- Add npm badge

## 0.0.2

- Add test-cases from official specs
- Add missing language index
- Add mnemonic to tests

## 0.0.1

- Initial implementation of [BIP85](https://github.com/bitcoin/bips/blob/master/bip-0085.mediawiki)
