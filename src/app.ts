import express, { Request, Response, Express } from 'express';
const app: Express = express();
import cors from 'cors';

// Cors setup
app.use(cors());

// Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
  res.send('Hell0o');
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.get('/testing-error-handlers', async (req: Request, res: Response) => {
  throw new Error('Something went wrong!!!!');
});

export default app;
