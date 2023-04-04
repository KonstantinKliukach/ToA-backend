"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function checkChance(num, chance) {
    return num >= chance.min && num <= chance.max;
}
exports.default = checkChance;
