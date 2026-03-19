"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hmacSHA512 = hmacSHA512;
const hmac_js_1 = require("@noble/hashes/hmac.js");
const sha2_js_1 = require("@noble/hashes/sha2.js");
function hmacSHA512(key, data) {
    return (0, hmac_js_1.hmac)(sha2_js_1.sha512, key, data);
}
