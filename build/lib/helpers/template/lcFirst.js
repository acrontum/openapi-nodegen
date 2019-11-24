"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 *
 * @param inputString to ucfirst
 * @returns {string}
 */
exports.default = (inputString) => {
    if (typeof inputString !== 'string') {
        throw new Error('Param passed to lcfirst is not type string but type: ' + typeof inputString);
    }
    return inputString.charAt(0).toLowerCase() + inputString.slice(1);
};