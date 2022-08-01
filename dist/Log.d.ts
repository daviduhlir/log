import { LogHandler } from './LogHandler';
export interface Configuration {
    level: number;
    handlers: LogHandler[];
}
export declare class Log {
    protected static initialized: boolean;
    protected static configuration: Configuration;
    static configure(configuration: Partial<Configuration>): void;
    static getConfiguration(): Configuration;
    static overrideConsole(): void;
    static debug(...args: any[]): void;
    static info(...args: any[]): void;
    static warning(...args: any[]): void;
    static error(...args: any[]): void;
    static critical(...args: any[]): void;
    static log(level: number, ...args: any[]): void;
    protected static write(pids: number[], level: number, date: Date, message: string): Promise<void>;
    protected static format(...args: any[]): string;
}
