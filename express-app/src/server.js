import express from 'express';
import ErrorHandler from './middlewares/error-handler.js';
import rootRouter from './routes/index.js';
import { PORT } from '../config/index.js';
import { authRequest } from './middlewares/auth-handler.js';
const app = express();

app.use(express.json());

app.use('/api', [authRequest], rootRouter);

app.use(ErrorHandler);

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});

export default app;