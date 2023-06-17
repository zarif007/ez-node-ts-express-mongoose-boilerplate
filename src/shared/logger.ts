import path from 'path'
import { createLogger, format, transports } from 'winston'
import DailyRotateFile from 'winston-daily-rotate-file'
const { combine, timestamp, label, printf } = format

const transportsCreator = (level: 'info' | 'error') => [
  new transports.Console(),
  new DailyRotateFile({
    filename: path.join(
      process.cwd(),
      'logs',
      'winston',
      `${level}s`,
      `[%DATE%]-${level}.log`
    ),
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
  }),
  new transports.File({ filename: `${level}.log` }),
]

const myFormat = printf(({ level, message, label, timestamp }) => {
  const date = new Date(timestamp)
  const hour = date.getHours()
  const minutes = date.getMinutes()
  const seconds = date.getSeconds()
  return `[${date.toDateString()} at ${hour}:${minutes}:${seconds}] [${label}] ${level}: ${message}`
})

const infoLogger = createLogger({
  level: 'info',
  format: combine(
    format.colorize(),
    label({ label: 'crazy!' }),
    timestamp(),
    myFormat
  ),
  transports: transportsCreator('info'),
})

const errorLogger = createLogger({
  level: 'error',
  format: combine(
    format.colorize(),
    label({ label: 'no!' }),
    timestamp(),
    myFormat
  ),
  transports: transportsCreator('error'),
})

export { infoLogger, errorLogger }
