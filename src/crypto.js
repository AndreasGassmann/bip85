"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hmacSHA512 = void 0;
const createHmac = require("create-hmac");
// Copied from https://github.com/bitcoinjs/bip32/blob/master/ts-src/crypto.ts because it is not exported
function hmacSHA512(key, data) {
    return createHmac('sha512', key).update(data).digest();
}
exports.hmacSHA512 = hmacSHA512;
