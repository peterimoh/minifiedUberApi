import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import JWT from 'jsonwebtoken';

import {
  getter,
  poster,
  patcher,
  putter,
  controller,
  RequestBodyValidator,
} from '../decorators/index';
import { User } from '../model/user.model';
import { Values } from '../value/values';

//encrypt password
async function hashPassword(password: string) {
  return await bcrypt.hash(password, 10);
}

async function validatePassword(password: string, hashedPassword: string) {
  return await bcrypt.compare(password, hashedPassword);
}

@controller('/api')
class LoginController {
  // ======================= register endpoint ==============================================
  @poster('/register')
  @RequestBodyValidator('firstName', 'lastName', 'email', 'password')
  async postRegister(req: Request, res: Response, next: NextFunction) {
    const {
      firstName,
      lastName,
      email,
      password,
      vehicle,
      isDriver,
      isAvailable,
    } = req.body;

    const hashedPassword = await hashPassword(password);

    User.findOne({ email }).then(async (user) => {
      if (user) {
        console.log({ error: 'User already exists' });
      } else {
        let newUser = new User({
          firstName,
          lastName,
          email,
          password: hashedPassword,
          vehicle,
          isDriver,
          isAvailable,
        });

        await newUser.save().then((user) => {
          res.status(200).json({ message: 'User Created' });
        });
      }
    });
  }

  // ====================== login endpoint =======================================================
  @poster('/login')
  @RequestBodyValidator('email', 'password')
  async postLogin(req: Request, res: Response) {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(422).json({ error: 'User does not exist' });

    const comparePassword = await validatePassword(password, user.password);
    if (!comparePassword)
      return res.status(422).json({ error: 'Invalid Password' });

    const usr = {
      email: user.email,
      id: user._id,
    };

    const token = JWT.sign({ usr }, Values.jwtSecret, { expiresIn: '24h' });
    res.status(200).json({ token, user });
  }

  // ===================== get Available Drivers =================================================
  @getter('/driver/:available')
  async getAvailableDriver(req: Request, res: Response) {
    const { available } = req.params;
    const driver = await User.find({ isDriver: true, isAvailable: available });

    res.status(200).json(driver);
  }

  // ===================== toggle is available status ==============================================================
  @putter('/driver/availability/:id')
  async putterDriver(req: Request, res: Response) {
    const { id } = req.params;
    console.log(req.body);
    const { isAvailable, latitude, longitude } = req.body;
    const driver = await User.findById(id);
    if (!driver)
      return res.status(422).json({ error: 'Driver does not exist' });

    driver.isAvailable = isAvailable;
    driver.latitude = latitude;
    driver.longitude = longitude;
    await driver.save();
    res.status(200).json({ msg: 'Driver status changed' });
  }

  // ===================== toggle is booked status ==============================================================
  @poster('/driver/booked/:id')
  async posterDriverBooked(req: Request, res: Response) {
    const { id } = req.params;
    console.log(req.body);
    const { isBooked } = req.body;
    const driver = await User.findById(id);
    if (!driver)
      return res.status(422).json({ error: 'Driver does not exist' });

    driver.isBooked = isBooked;
    await driver.save();
    res.status(200).json({ msg: 'Driver status changed' });
  }
}
