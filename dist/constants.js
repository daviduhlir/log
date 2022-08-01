"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.levelNames = exports.logLevel = void 0;
exports.logLevel = {
    DEBUG: 4,
    INFO: 3,
    WARNING: 2,
    ERROR: 1,
    CRITICAL: 0,
};
exports.levelNames = {
    [exports.logLevel.CRITICAL]: 'C',
    [exports.logLevel.ERROR]: 'E',
    [exports.logLevel.WARNING]: 'W',
    [exports.logLevel.INFO]: 'I',
    [exports.logLevel.DEBUG]: 'D',
};
//# sourceMappingURL=constants.js.map