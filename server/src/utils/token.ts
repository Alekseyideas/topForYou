import { sign } from 'jsonwebtoken';
import { Response } from 'express';
import { User } from '../models/User';

export function createAccessToken({ id }: User) {
  return sign({ id }, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn: '5s',
  });
}
export function createRefreshToken({ id, tokenVersion }: User) {
  return sign({ id, tokenVersion }, process.env.ACCESS_REFRESH_TOKEN_SECRET!, {
    expiresIn: '7d',
  });
}

export const sendRefreshToken = (res: Response, user: User) => {
  res.cookie('jid', createRefreshToken(user), {
    httpOnly: true,
  });
  // res.cookie('jid', createRefreshToken(user), {
  //   httpOnly: true,
  // });
};
