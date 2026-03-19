import { MONERO_WORDLIST } from './moneroWordlist.js';
const WORDLIST_SIZE = 1626;
const UNIQUE_PREFIX_LENGTH = 3;
function endianSwap(hex) {
    return hex[6] + hex[7] + hex[4] + hex[5] + hex[2] + hex[3] + hex[0] + hex[1];
}
function crc32(data) {
    let crc = 0xffffffff;
    for (let i = 0; i < data.length; i++) {
        crc ^= data[i];
        for (let j = 0; j < 8; j++) {
            crc = (crc >>> 1) ^ (crc & 1 ? 0xedb88320 : 0);
        }
    }
    return (crc ^ 0xffffffff) >>> 0;
}
export function entropyToMoneroMnemonic(entropyHex, size = 32) {
    const hex = entropyHex.slice(0, size * 2);
    const out = [];
    for (let i = 0; i < hex.length / 8; i++) {
        const word = endianSwap(hex.slice(8 * i, 8 * i + 8));
        const x = parseInt(word, 16);
        const w1 = x % WORDLIST_SIZE;
        const w2 = (Math.floor(x / WORDLIST_SIZE) + w1) % WORDLIST_SIZE;
        const w3 = (Math.floor(x / WORDLIST_SIZE / WORDLIST_SIZE) + w2) % WORDLIST_SIZE;
        out.push(MONERO_WORDLIST[w1], MONERO_WORDLIST[w2], MONERO_WORDLIST[w3]);
    }
    const wstr = out.map((w) => w.slice(0, UNIQUE_PREFIX_LENGTH)).join('');
    const crcVal = crc32(new TextEncoder().encode(wstr));
    const checksumIdx = crcVal % out.length;
    out.push(out[checksumIdx]);
    return out.join(' ');
}
