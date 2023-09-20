"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.returnRandomPostionFromRange = exports.returnRandomRGBValue = void 0;
function returnRandomRGBValue() {
    return Math.floor(Math.random() * 256);
}
exports.returnRandomRGBValue = returnRandomRGBValue;
function returnRandomPostionFromRange(range) {
    return Math.floor(Math.random() * range);
}
exports.returnRandomPostionFromRange = returnRandomPostionFromRange;
//# sourceMappingURL=randomizer.js.map