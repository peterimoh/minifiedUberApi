import mongoose, { Mongoose } from 'mongoose';
import { Values } from '../value/values';

mongoose
  .connect(Values.mongoURI)
  .then(() => console.log('successfully connected to mongoDB'))
  .catch((err) => console.log(err));

export const db: Mongoose = mongoose;
