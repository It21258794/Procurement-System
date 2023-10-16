import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { accountRoute } from './src/routes/account.route';
import { itemRoute } from './src/routes/item.route';
import cors from 'cors';
import { paymentRoute } from './src/routes/payment.route';
import { siteRoute } from './src/routes/site.route';
import { Server } from 'socket.io';
import { orderRoute } from './src/routes/order.route';
import logger from './log/logger';
import { error } from 'console';
import { cartRoute } from './src/routes/cart.route';

require('dotenv').config();

const app: Express = express();
const port = process.env.PORT;

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript Express!');
});

app.use('/api/account', accountRoute);
app.use('/api/item', itemRoute);
app.use('/api/payment', paymentRoute);
app.use('/api/site', siteRoute);
app.use('/api/order', orderRoute);
app.use('/api/cart', cartRoute);

mongoose.connect(process.env.MONGODB_URI).then(() => {
  logger.info('MongoDB connected');
  app.on('error', (err) => {
    logger.error(err);
  });
  const server = app.listen(port, () => {
    logger.info(`TypeScript with Express
         http://localhost:${port}/`);

    const io = new Server(server, {
      cors: {
        origin: 'http://localhost:5173',
      },
    });

    io.on('connection', (socket) => {
      logger.error('some has connected to socket');

      socket.on('disconnect', () => {
        logger.error('socket discconected ');
      });
    });
  });
});
