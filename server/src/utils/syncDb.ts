import sequelize from './db';

const syncDB = () =>
  new Promise(async (res, rej) => {
    try {
      const data = await sequelize.sync({ force: false, alter: true });
      res(data);
    } catch (e) {
      console.log(e, 2222);
      rej(e);
    }
  });

export = syncDB;
