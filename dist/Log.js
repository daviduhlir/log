"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Log = void 0;
const util = require("util");
const constants_1 = require("./constants");
const defaltConfiguration = {
    level: constants_1.logLevel.DEBUG,
    handlers: [],
};
class Log {
    static configure(configuration) {
        Log.configuration = {
            ...defaltConfiguration,
            ...Log.configuration,
            ...configuration,
        };
        if (!Log.initialized) {
            process.on('uncaughtException', e => Log.critical(`Application crashed - uncaughtException`, e));
            Log.initialized = true;
        }
    }
    static getConfiguration() {
        return Log.configuration;
    }
    static overrideConsole() {
        Log.configure({});
        console.log = Log.info;
        console.debug = Log.debug;
        console.info = Log.info;
        console.error = Log.error;
        console.trace = Log.debug;
        console.warn = Log.warning;
    }
    static debug(...args) {
        Log.log(constants_1.logLevel.DEBUG, ...args);
    }
    static info(...args) {
        Log.log(constants_1.logLevel.INFO, ...args);
    }
    static warning(...args) {
        Log.log(constants_1.logLevel.WARNING, ...args);
    }
    static error(...args) {
        Log.log(constants_1.logLevel.ERROR, ...args);
    }
    static critical(...args) {
        Log.log(constants_1.logLevel.CRITICAL, ...args);
    }
    static log(level, ...args) {
        if (typeof this.configuration.level !== 'undefined' && level > Log.configuration.level) {
            return;
        }
        const message = Log.format.apply(this, args);
        Log.write([process.pid], level, new Date(), message);
    }
    static async write(pids, level, date, message) {
        for (const handler of Log.configuration.handlers) {
            await handler.write(pids, level, date, message);
        }
    }
    static format(...args) {
        let strs = [];
        for (let i = 0; i < args.length;) {
            const x = args[i++];
            if (typeof x === 'string') {
                let str = x;
                str = String(str).replace(/%[sdj]/g, (p) => {
                    switch (p) {
                        case '%s':
                            return String(args[i++]);
                        case '%d':
                            return Number(args[i++]).toString();
                        case '%j':
                            return JSON.stringify(args[i++]);
                        default:
                            return p;
                    }
                });
                strs.push(str);
            }
            else if (typeof x === 'object') {
                strs.push(util.inspect(x));
            }
            else {
                strs.push(JSON.stringify(x));
            }
        }
        return strs.join(' ');
    }
}
exports.Log = Log;
Log.initialized = false;
Log.configuration = defaltConfiguration;
//# sourceMappingURL=Log.js.map