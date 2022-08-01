/*
 * Log class
 *
 * Created by David Uhlíř 2022
 */
import * as util from 'util'
import { logLevel } from './constants'
import { LogHandler } from './LogHandler'

export interface Configuration {
  level: number
  handlers: LogHandler[]
}

const defaltConfiguration: Configuration = {
  level: logLevel.DEBUG,
  handlers: [],
}

/**
 * Log class is singleton, that can be used in any fork or master.
 * If you call some log from child, it will be passed to master and log
 * is processed there.
 */
export class Log {
  protected static initialized = false
  protected static configuration: Configuration = defaltConfiguration

  /**
   * Sets the configuration
   */
  public static configure(configuration: Partial<Configuration>) {
    Log.configuration = {
      ...defaltConfiguration,
      ...Log.configuration,
      ...configuration,
    }

    if (!Log.initialized) {
      process.on('uncaughtException', e => Log.critical(`Application crashed - uncaughtException`, e))
      Log.initialized = true
    }
  }

  /**
   * Gets the configuration
   */
  public static getConfiguration(): Configuration {
    return Log.configuration
  }

  /**
   * Override console functions
   */
  public static overrideConsole() {
    Log.configure({})
    console.log = Log.info
    console.debug = Log.debug
    console.info = Log.info
    console.error = Log.error
    console.trace = Log.debug
    console.warn = Log.warning
  }

  /**
   * Log functions
   */
  public static debug(...args: any[]) {
    Log.log(logLevel.DEBUG, ...args)
  }

  public static info(...args: any[]) {
    Log.log(logLevel.INFO, ...args)
  }

  public static warning(...args: any[]) {
    Log.log(logLevel.WARNING, ...args)
  }

  public static error(...args: any[]) {
    Log.log(logLevel.ERROR, ...args)
  }

  public static critical(...args: any[]) {
    Log.log(logLevel.CRITICAL, ...args)
  }

  /**
   * Main log function
   */
  public static log(level: number, ...args: any[]) {
    if (typeof this.configuration.level !== 'undefined' && level > Log.configuration.level) {
      return
    }
    const message = Log.format.apply(this, args)
    Log.write([process.pid], level, new Date(), message)
  }

  /**
   * Internals
   */

  /**
   * Internal write function
   */
  protected static async write(pids: number[], level: number, date: Date, message: string) {
    for (const handler of Log.configuration.handlers) {
      await handler.write(pids, level, date, message)
    }
  }

  /**
   * Formater
   *
   * Its format args, that is received from log to something readable.
   * Objects are converted to string by inspect.
   * You can use formated strings with (%s, %d or %j)
   */
  protected static format(...args: any[]) {
    let strs = []
    for (let i = 0; i < args.length; ) {
      const x = args[i++]
      if (typeof x === 'string') {
        let str = x
        str = String(str).replace(/%[sdj]/g, (p: string) => {
          switch (p) {
            case '%s':
              return String(args[i++])
            case '%d':
              return Number(args[i++]).toString()
            case '%j':
              return JSON.stringify(args[i++])
            default:
              return p
          }
        })
        strs.push(str)
      } else if (typeof x === 'object') {
        strs.push(util.inspect(x))
      } else {
        strs.push(JSON.stringify(x))
      }
    }
    return strs.join(' ')
  }
}
