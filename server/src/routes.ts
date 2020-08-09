import { Router } from 'express';
import { refreshUserToken } from './controllers/userController';

const router = Router();

router.get('/', (_, res) => {
  res.send(`<h1>Express server started success</h1>`);
});

router.post('/test', (req, res) => {
  console.log('res: ', res);
  console.log('req: ', req);
  return res.send({
    ok: false,
    accessToken: '',
  });
});
router.post('/refresh-token', refreshUserToken);

export default router;
