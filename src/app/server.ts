import mongoose from 'mongoose';
import Config from './Config';
import app from './app';

const main = async () => {
  try {
    await mongoose.connect(Config.dataBase_url as string);
    app.get('/', (req, res) => {
      res.send({ message: 'Server is running' });
    });
    app.listen(Config.port, () => {
      console.log('Server is running on ' + Config.port + ' Port');
    });
  } catch (err) {
    console.log(err);
  }
};

main();
