import { Schema, model } from 'mongoose';

export interface UserType {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  vehicle: string;
  isDriver: boolean;
  isAvailable: boolean;
  createdAt: Date;
}

const userSchema: Schema<UserType> = new Schema<UserType>({
  firstName: { required: true },
  lastName: { required: true },
  email: { required: true },
  password: { required: true },
  vehicle: { required: false },
  isDriver: { required: false },
  isAvailable: { required: false },
  createdAt: { default: Date.now },
});

export const User = model<UserType>('User', userSchema);
