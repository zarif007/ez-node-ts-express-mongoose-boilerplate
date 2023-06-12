import mongoose from "mongoose";
import envConfig from "./config/envConfig";

const main = async () => {
  try {
    await mongoose.connect(envConfig.database_url as string);
    console.log(`🤩 Database is connected ${envConfig.PORT}`)
  } catch (err) {
    console.log(`Failed to connect to Database ${err}`)
  }
};

main();