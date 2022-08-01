import { LogHandler } from './LogHandler'

export class LogConsoleHandler extends LogHandler {
  /**
   * Internal write function
   */
  public async write(pids: number[], level: number, date: Date, message: string) {
    const output = await this.prepareMessage(pids, level, date, message)
    const res = process.stdout.write(output + '\n')

    //  this is the first time stdout got backed up
    if (!res && !(process.stdout as any).pendingWrite) {
      ;(process.stdout as any).pendingWrite = true

      //  magic sauce: keep node alive until stdout has flushed
      process.stdout.once('drain', function () {
        ;(process.stdout as any).pendingWrite = false
      })
    }
  }
}
