import './helpers/loadEnv.js';
const { PORT } = process.env;

import express from 'express';
import appRouter from './routes/index.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('api/v1/', appRouter);

app.listen(PORT, () => {
  console.log('Listening on port', PORT);
});