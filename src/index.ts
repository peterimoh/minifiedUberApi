import express, { Express } from 'express';
import morgan from 'morgan';

import { PORT } from './value/values';
import { AppRouter } from './AppRouter';

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(AppRouter.getInstance());

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
