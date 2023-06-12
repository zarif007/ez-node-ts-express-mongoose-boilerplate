import express, { Request, Response } from 'express'
import envConfig from './config/envConfig';
const app: Application = express();


app.listen(envConfig.PORT, () => {
    console.log(`App is flying on PORT ${envConfig.PORT}`)
})

app.get('/', (req: Request, res: Response) => {
    res.send('Hell')
})

export default app;
