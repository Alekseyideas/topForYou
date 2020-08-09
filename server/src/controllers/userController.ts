import { Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { User } from '../models/User';
import { createAccessToken, sendRefreshToken } from '../utils/token';

export const refreshUserToken = async (req: Request, res: Response) => {
  const token = req.cookies.jid;

  if (!token) {
    return res.send({
      ok: false,
      accessToken: '',
    });
  }

  let payload: any = null;

  try {
    payload = verify(token, process.env.ACCESS_REFRESH_TOKEN_SECRET!);
  } catch (e) {
    console.log('e: ', e);
    return res.send({
      ok: false,
      accessToken: '',
    });
  }

  const user = await User.findByPk(payload.id);

  if (!user) {
    return res.send({ ok: false, accessToken: '' });
  }
  if (user.tokenVersion !== payload.tokenVersion) {
    return res.send({ ok: false, accessToken: '' });
  }

  sendRefreshToken(res, user);

  return res.send({
    ok: true,
    accessToken: createAccessToken(user),
  });
};
