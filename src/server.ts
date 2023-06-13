import mongoose from 'mongoose'
import envConfig from './config/envConfig'
import app from './app'

const main = async () => {
  try {
    await mongoose.connect(envConfig.database_url as string)
    console.log(`🤩 Database is connected`)

    app.listen(envConfig.PORT, () => {
      console.log(`App is listening on PORT ${envConfig.PORT}`)
      console.log(`Process ID ${process.pid}`)
    })
  } catch (err) {
    console.log(`Failed to connect to Database ${err}`)
  }
}

main()
