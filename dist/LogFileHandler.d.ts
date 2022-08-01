import { LogHandler } from './LogHandler';
export declare class LogFileHandler extends LogHandler {
    readonly filePath: string;
    constructor(filePath: string);
    backupLog(): Promise<void>;
    write(pids: number[], level: number, date: Date, message: string): Promise<void>;
}
