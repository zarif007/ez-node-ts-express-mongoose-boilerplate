import mongoose from 'mongoose';
import envConfig from './config/envConfig';
import app from './app';
import { infoLogger, errorLogger } from './shared/logger';
import { Server } from 'http';

let server: Server;
const main = async () => {
  try {
    await mongoose.connect(envConfig.database_url as string);
    infoLogger.info(`🤩 Database is connected`);

    server = app.listen(envConfig.PORT, () => {
      infoLogger.info(
        `App is listening on PORT ${envConfig.PORT} & Process ID ${process.pid}`
      );
    });
  } catch (err) {
    errorLogger.error(`Failed to connect to Database ${err}`);
  }

  // handling Gracefully shutting off the server for unhandledRejection
  process.on('unhandledRejection', error => {
    if (server) {
      server.close(() => {
        errorLogger.error(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
};

main();

// handling shutting off the server for uncaughtException
process.on('uncaughtException', error => {
  errorLogger.error(error);
  process.exit(1);
});

// handling signal for termination
process.on('SIGTERM', () => {
  infoLogger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});
