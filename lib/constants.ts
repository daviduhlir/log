export const logLevel = {
  DEBUG: 4,
  INFO: 3,
  WARNING: 2,
  ERROR: 1,
  CRITICAL: 0,
}

export const levelNames = {
  [logLevel.CRITICAL]: 'C',
  [logLevel.ERROR]: 'E',
  [logLevel.WARNING]: 'W',
  [logLevel.INFO]: 'I',
  [logLevel.DEBUG]: 'D',
}
