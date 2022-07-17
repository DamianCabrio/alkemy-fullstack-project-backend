import './helpers/loadEnv.js';
import cors from 'cors';

const { PORT } = process.env;

import express from 'express';
import appRouter from './routes/index.js';
import apiErrorHandler from './middlewares/apiErrorHandler.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/api/v1/', appRouter);

app.use(apiErrorHandler);

app.listen(PORT, () => {
  console.log('Listening on port', PORT);
});
