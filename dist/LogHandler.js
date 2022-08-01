"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogHandler = void 0;
const array_1 = require("./utils/array");
const constants_1 = require("./constants");
class LogHandler {
    async write(pids, level, date, message) { }
    async prepareMessage(pids, level, date, message) {
        const pidsString = array_1.arrayUniqueExtended(pids)
            .map(i => (i.times <= 1 ? i.item : `${i.times}x ${i.item}`))
            .join(', ');
        return `${date.toLocaleString()} (${constants_1.levelNames[level]}) [${pidsString}]: ${message}`;
    }
}
exports.LogHandler = LogHandler;
//# sourceMappingURL=LogHandler.js.map