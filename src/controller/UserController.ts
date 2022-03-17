import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import JWT from 'jsonwebtoken';

import {
  getter,
  poster,
  patcher,
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
  async post_Register(req: Request, res: Response) {
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

    await User.findOne({ email }).then((user) => {
      if (user) return res.status(402).json({ msg: 'User Already Exist' });
    });

    let newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      vehicle,
      isDriver,
      isAvailable,
    });

    await newUser.save();
    return res.status(200).json({ msg: 'New user Created, Proceed to Login' });
  }

  // ====================== login endpoint =======================================================
  @poster('/login')
  @RequestBodyValidator('email', 'password')
  async postLogin(req: Request, res: Response) {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(402).json({ msg: 'User does not exist' });

    const comparePassword = await validatePassword(password, user.password);
    if (!comparePassword)
      return res.status(403).json({ msg: 'Invalid Password' });

    const usr = {
      email: user.email,
      id: user._id,
    };

    const token = JWT.sign({ usr }, Values.jwtSecret, { expiresIn: '24h' });
    res.status(200).json({ token });
  }
}
