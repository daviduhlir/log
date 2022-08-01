import { arrayUniqueExtended } from './utils/array'
import { levelNames } from './constants'

export class LogHandler {
  /**
   * Internal write function
   */
  public async write(pids: number[], level: number, date: Date, message: string) {}

  /**
   * Prepare messsage text
   */
  protected async prepareMessage(pids: number[], level: number, date: Date, message: string) {
    const pidsString = arrayUniqueExtended(pids)
      .map(i => (i.times <= 1 ? i.item : `${i.times}x ${i.item}`))
      .join(', ')
    return `${date.toLocaleString()} (${levelNames[level]}) [${pidsString}]: ${message}`
  }
}
