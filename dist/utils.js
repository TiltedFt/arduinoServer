"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkIfNumber = exports.isRGBValueValid = void 0;
function isRGBValueValid(value) {
    if (value < 28 || value > 500) {
        return false;
    }
    else {
        return true;
    }
}
exports.isRGBValueValid = isRGBValueValid;
function checkIfNumber(value) {
    const num = Number(value);
    if (isNaN(num)) {
        return false;
    }
    return true;
}
exports.checkIfNumber = checkIfNumber;
//# sourceMappingURL=utils.js.map