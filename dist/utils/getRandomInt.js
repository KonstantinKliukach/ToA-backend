"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getRandomInt(min, max) {
    const minInt = Math.ceil(min);
    const maxInt = Math.floor(max);
    return Math.floor(Math.random() * (maxInt - minInt)) + minInt;
}
exports.default = getRandomInt;
