export declare class LogHandler {
    write(pids: number[], level: number, date: Date, message: string): Promise<void>;
    protected prepareMessage(pids: number[], level: number, date: Date, message: string): Promise<string>;
}
