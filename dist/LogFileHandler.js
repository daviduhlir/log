"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogFileHandler = void 0;
const fs_1 = require("fs");
const LogHandler_1 = require("./LogHandler");
const cluster = require("cluster");
const path = require("path");
class LogFileHandler extends LogHandler_1.LogHandler {
    constructor(filePath) {
        super();
        this.filePath = filePath;
    }
    async backupLog() {
        if (!cluster.isMaster) {
            throw new Error('Log::Only master process can work with files.');
        }
        if (!this.filePath) {
            return;
        }
        try {
            await fs_1.promises.access(this.filePath, fs_1.constants.W_OK | fs_1.constants.R_OK);
            let newFilename = `${path.parse(this.filePath).dir}/${new Date().toISOString()}.log`;
            await fs_1.promises.rename(this.filePath, newFilename);
        }
        catch (e) { }
    }
    async write(pids, level, date, message) {
        const output = await this.prepareMessage(pids, level, date, message);
        await fs_1.promises.appendFile(this.filePath, output + '\n');
    }
}
exports.LogFileHandler = LogFileHandler;
//# sourceMappingURL=LogFileHandler.js.map