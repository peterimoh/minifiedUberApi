import express, { Express } from 'express';
import morgan from 'morgan';
import cors from 'cors';

import { AppRouter } from './AppRouter';
import { Values } from './value/values';
import './config/db.connection';
import './controller/router';

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(AppRouter.getInstance());

app.listen(Values.port, () =>
  console.log(`Server is running on port ${Values.port}`)
);
