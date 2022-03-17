import express, { Express } from 'express';
import morgan from 'morgan';

import { AppRouter } from './AppRouter';
import { Values } from './value/values';
import './config/db.connection';

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(AppRouter.getInstance());

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(Values.port, () =>
  console.log(`Server is running on port ${Values.port}`)
);
