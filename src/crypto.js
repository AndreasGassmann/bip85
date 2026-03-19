import { hmac } from '@noble/hashes/hmac.js';
import { sha512 } from '@noble/hashes/sha2.js';
export function hmacSHA512(key, data) {
    return hmac(sha512, key, data);
}
