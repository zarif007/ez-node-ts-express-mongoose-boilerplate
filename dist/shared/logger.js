"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorLogger = exports.infoLogger = void 0;
const path_1 = __importDefault(require("path"));
const winston_1 = require("winston");
const winston_daily_rotate_file_1 = __importDefault(require("winston-daily-rotate-file"));
const { combine, timestamp, label, printf } = winston_1.format;
const transportsCreator = (level) => [
    new winston_1.transports.Console(),
    new winston_daily_rotate_file_1.default({
        filename: path_1.default.join(process.cwd(), 'logs', 'winston', `${level}s`, `[%DATE%]-${level}.log`),
        datePattern: 'YYYY-MM-DD-HH',
        zippedArchive: true,
        maxSize: '20m',
        maxFiles: '14d',
    }),
    new winston_1.transports.File({ filename: `${level}.log` }),
];
const myFormat = printf(({ level, message, label, timestamp }) => {
    const date = new Date(timestamp);
    const hour = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    return `[${date.toDateString()} at ${hour}:${minutes}:${seconds}] [${label}] ${level}: ${message}`;
});
const infoLogger = (0, winston_1.createLogger)({
    level: 'info',
    format: combine(winston_1.format.colorize(), label({ label: 'crazy!' }), timestamp(), myFormat),
    transports: transportsCreator('info'),
});
exports.infoLogger = infoLogger;
const errorLogger = (0, winston_1.createLogger)({
    level: 'error',
    format: combine(winston_1.format.colorize(), label({ label: 'no!' }), timestamp(), myFormat),
    transports: transportsCreator('error'),
});
exports.errorLogger = errorLogger;
