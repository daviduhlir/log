"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogConsoleHandler = void 0;
const LogHandler_1 = require("./LogHandler");
class LogConsoleHandler extends LogHandler_1.LogHandler {
    async write(pids, level, date, message) {
        const output = await this.prepareMessage(pids, level, date, message);
        const res = process.stdout.write(output + '\n');
        if (!res && !process.stdout.pendingWrite) {
            ;
            process.stdout.pendingWrite = true;
            process.stdout.once('drain', function () {
                ;
                process.stdout.pendingWrite = false;
            });
        }
    }
}
exports.LogConsoleHandler = LogConsoleHandler;
//# sourceMappingURL=LogConsoleHandler.js.map