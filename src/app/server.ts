import mongoose from 'mongoose';
import Config from './Config';
import app from './app';
import path from 'path';

const main = async () => {
  try {
    await mongoose.connect(Config.dataBase_url as string);

    app.listen(Config.port, () => {
      console.log('Server is running on ' + Config.port + ' Port');
    });
  } catch (err) {
    console.log(err);
  }
};

main();
