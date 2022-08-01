import { LogHandler } from './LogHandler';
export declare class LogConsoleHandler extends LogHandler {
    write(pids: number[], level: number, date: Date, message: string): Promise<void>;
}
