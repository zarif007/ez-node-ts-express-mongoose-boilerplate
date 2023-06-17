import mongoose from 'mongoose'
import envConfig from './config/envConfig'
import app from './app'
import { infoLogger, errorLogger } from './shared/logger'

const main = async () => {
  try {
    await mongoose.connect(envConfig.database_url as string)
    infoLogger.info(`🤩 Database is connected`)

    app.listen(envConfig.PORT, () => {
      infoLogger.info(
        `App is listening on PORT ${envConfig.PORT} & Process ID ${process.pid}`
      )
    })
  } catch (err) {
    errorLogger.error(`Failed to connect to Database ${err}`)
  }
}

main()
