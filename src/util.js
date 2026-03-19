"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidIndex = isValidIndex;
function isValidIndex(index) {
    return typeof index === 'number' && index >= 0;
}
