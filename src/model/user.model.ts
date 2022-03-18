import { Schema, model } from 'mongoose';

export interface UserType {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isBooked: boolean;
  isDriver: boolean;
  isAvailable: boolean;
  latitude: number;
  longitude: number;
  createdAt: Date;
}

const userSchema: Schema<UserType> = new Schema<UserType>({
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String },
  password: { type: String },
  isBooked: { type: Boolean, required: false },
  isDriver: { type: Boolean, required: false },
  isAvailable: { type: Boolean, required: false },
  latitude: { type: Number, required: false },
  longitude: { type: Number, required: false },
  createdAt: { type: Date, default: Date.now },
});

export const User = model<UserType>('User', userSchema);
