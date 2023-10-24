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
import { noteRoute } from './src/routes/note.route';
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



app.use('/api/account', accountRoute);
app.use('/api/item', itemRoute);
app.use('/api/payment', paymentRoute);
app.use('/api/site', siteRoute);
app.use('/api/order', orderRoute);
app.use('/api/cart', cartRoute);
app.use('/api/note', noteRoute);

let onlineUsers: any= [];
const addNewUser = (userId:string, socketId:any) => {
  !onlineUsers.some((user:any) => user.userId === userId) &&
    onlineUsers.push({ userId, socketId });
};

const removeUser = (socketId:any) => {
  onlineUsers = onlineUsers.filter((user:any) => user.socketId !== socketId);
};

const getUser = (userId:any) => {
  return onlineUsers.find((user:any) => user.userId === userId);
};

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
      
      socket.on("newUser", (userId) => {
        console.log("socket",userId)
        addNewUser(userId, socket.id);
      });

      socket.on("sendOrderToSupplier", ({ reciverId, orderItem }) => {
        const receiver = getUser(reciverId);
        io.to(receiver.socketId).emit("getOrderfromStaff", {
          orderItem
        });
      });

      socket.on("sendConfirmationToStaff", ({ reciverId, orderId ,status}) => {
        const staff = getUser(reciverId);
        io.to(staff.socketId).emit("getConfirmationfromSupplier", {
          orderId,status
        });
      })

      socket.on('disconnect', () => {
        removeUser(socket.id);
      });

     


    });
  });
});
