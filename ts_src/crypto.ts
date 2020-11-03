import * as createHmac from 'create-hmac';

// Copied from https://github.com/bitcoinjs/bip32/blob/master/ts-src/crypto.ts because it is not exported
export function hmacSHA512(key: Buffer, data: Buffer): Buffer {
  return createHmac('sha512', key).update(data).digest();
}
