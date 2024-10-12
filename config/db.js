const mongoose = require('mongoose');

const connectDB = async () => {
  try {

     // Ellenőrizzük, hogy az MONGODB_URI létezik-e
     if (!process.env.MONGODB_URI) {
      console.error('Hiba: Nincs beállítva az MONGODB_URI környezeti változó.');
      process.exit(1);
    }

    await mongoose.connect(process.env.MONGODB_URI);

    console.log('Sikeres csatlakozás a MongoDb szerverhez!');
  } catch (error) {
    console.error('Csatlakozási hiba a MongoDb szerverhez:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
