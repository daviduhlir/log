import { Log, LogConsoleHandler, LogFileHandler } from '@david.uhlir/log'

// configure log
Log.configure({
  handlers: [
    new LogConsoleHandler(),
    new LogFileHandler('./log/runtime.log'),
  ]
})

// override console
Log.overrideConsole()

// test log
console.log('Hello world!')
