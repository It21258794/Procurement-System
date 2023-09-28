import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import mongoose from "mongoose";
import {accountRoute} from './src/routes/account.route'

require("dotenv").config();


const app: Express = express();
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript Express!');
});

app.use("/api/account", accountRoute);


mongoose.connect(
    process.env.MONGODB_URI
    ).then(()=> {
        console.log('MongoDB connected');
        app.on('error', (e) => {
          console.log(e)
        });
        app.listen(port, () => {
          console.log(`TypeScript with Express
         http://localhost:${port}/`);
        });
      });