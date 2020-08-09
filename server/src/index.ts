import express, { Application, Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import 'reflect-metadata';
import 'dotenv/config';
import { PORT } from './utils/config';
import createConnection from './utils/createConnection';
import createServer from './utils/createServer';
import router from './routes';
const app: Application = express();
(async () => {
  app.use(cookieParser());
  app.use(
    cors({
      origin: 'http://localhost:3015',
      optionsSuccessStatus: 200,
    })
  );
  app.use(router);
  await createConnection();

  const server = await createServer(app);

  app.listen(PORT, () =>
    console.log(
      `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
    )
  );
})();
