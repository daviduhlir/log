# Log util for node.js applications

This util can override console, also it can handle multiple outpus, like console and file together.
You can extends LogHandler and add it to handlers to create your own output (like send to some api).

Example of initialization:
```ts
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
```

And then just use console.log, console.warn, console.error, etc...

ISC
