import 'reflect-metadata';

import express, { Request, Response } from 'express';
import 'express-async-errors';
import { router } from './routes';
import createConnection from './database';
import { AppError } from './errors/AppError';

createConnection();

const app = express();

app.use(express.json());
app.use(router);

app.use((err: Error, _: Request, response: Response) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      message: err.message,
    });
  }

  return response.status(500).json({
    status: 'error',
    message: `Internal server error ${err.message}`,
  });
});

export { app };
