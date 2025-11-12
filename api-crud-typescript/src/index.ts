import express from 'express';
import cors from 'cors';
import pino from 'pino';
import pinoHttp from 'pino-http';

import type { Request, Response, NextFunction } from 'express';
import productRouter from './router/productRouter';

const app = express();

const logger = pino({
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      translateTime: 'HH:MM:ss Z',
    }
  }
})

// logger.info('')
// Para integração com Express, você pode usar pino-http
app.use(pinoHttp({ logger }));

app.use(cors({ origin: 'http://127.0.0.1:5500' }));

app.use(express.json());

app.use('/product', productRouter);


app.use((req: Request, res: Response, next: NextFunction) => {
  res.send('Hello World!');
});

// middleware de tratamento de erros
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).send(error.message);
});

export default app;
