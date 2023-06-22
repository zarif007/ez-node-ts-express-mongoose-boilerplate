"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const envConfig_1 = __importDefault(require("./config/envConfig"));
const app_1 = __importDefault(require("./app"));
const logger_1 = require("./shared/logger");
let server;
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(envConfig_1.default.database_url);
        logger_1.infoLogger.info(`🤩 Database is connected`);
        server = app_1.default.listen(envConfig_1.default.PORT, () => {
            logger_1.infoLogger.info(`App is listening on PORT ${envConfig_1.default.PORT} & Process ID ${process.pid}`);
        });
    }
    catch (err) {
        logger_1.errorLogger.error(`Failed to connect to Database ${err}`);
    }
    // handling Gracefully shutting off the server for unhandledRejection
    process.on('unhandledRejection', error => {
        if (server) {
            server.close(() => {
                logger_1.errorLogger.error(error);
                process.exit(1);
            });
        }
        else {
            process.exit(1);
        }
    });
});
main();
// handling shutting off the server for uncaughtException
process.on('uncaughtException', error => {
    logger_1.errorLogger.error(error);
    process.exit(1);
});
// handling signal for termination
process.on('SIGTERM', () => {
    logger_1.infoLogger.info('SIGTERM received');
    if (server) {
        server.close();
    }
});
