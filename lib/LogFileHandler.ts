import { promises as fs, constants as fsConstants } from 'fs'
import { LogHandler } from './LogHandler'
import * as cluster from 'cluster'
import * as path from 'path'

export class LogFileHandler extends LogHandler {
  constructor(public readonly filePath: string) {
    super()
  }

  /**
   * Creates backup from old log file and starts new
   */
  public async backupLog() {
    if (!cluster.isMaster) {
      throw new Error('Log::Only master process can work with files.')
    }
    if (!this.filePath) {
      return
    }
    try {
      await fs.access(this.filePath, fsConstants.W_OK | fsConstants.R_OK)
      let newFilename = `${path.parse(this.filePath).dir}/${new Date().toISOString()}.log`
      await fs.rename(this.filePath, newFilename)
    } catch (e) {}
  }

  /**
   * Internal write function
   */
  public async write(pids: number[], level: number, date: Date, message: string) {
    const output = await this.prepareMessage(pids, level, date, message)
    await fs.appendFile(this.filePath, output + '\n')
  }
}
