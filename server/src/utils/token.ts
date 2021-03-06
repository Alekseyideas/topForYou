import { sign } from 'jsonwebtoken';
import { Response } from 'express';
import { User } from '../models/User';

export function createAccessToken({ id, role }: User) {
  return sign(
    { userId: id, userRole: role },
    process.env.ACCESS_TOKEN_SECRET!,
    {
      expiresIn: '1d',
    }
  );
}
export function createRefreshToken({ id, role, tokenVersion }: User) {
  return sign(
    { userId: id, tokenVersion, userRole: role },
    process.env.ACCESS_REFRESH_TOKEN_SECRET!,
    {
      expiresIn: '7d',
    }
  );
}

export const sendRefreshToken = (res: Response, user: User) => {
  res.cookie('jid', createRefreshToken(user), {
    httpOnly: true,
  });
  // res.cookie('jid', createRefreshToken(user), {
  //   httpOnly: true,
  // });
};
