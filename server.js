const express = require("express");
const fs = require("fs");
const path = require('path');
const dotenv = require("dotenv");
const connectDB = require('./config/db');
const GitartRouts = require('./routes/GitartRouts.js');

 
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const corsOptions = { 
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS', 'DELETE', 'PUT'],
  allowedHeaders: ['Authorization', 'Content-Type']
};

// Szükséges a cors, hogy külső oldalról is lehessen kéréseket küldeni az oldalra!
const cors = require("cors");
app.use(cors(corsOptions));


//konzolra íratjuk a kéréseket és az urlt
app.use((req, res, next) => {
  console.log(`Beérkezett ${req.method} kérés a következő URL-re: ${req.url}`);
  next();
});
 



// Képeket szolgáltatjuk statikus fájlként
app.use('/assets/img', express.static(path.join(__dirname, 'assets/img')));
app.use( express.static(path.join(__dirname, 'public')));


// Adatbázis kapcsolat léteítése
connectDB();




// Middleware - body-parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// az útvonalak 
app.use('/', GitartRouts)

 

app.get('/favicon.ico' , (req, res) => {
res.sendFile(path.join(__dirname, 'favicon.png'))
});



// Ha nem megfelelő az URL hibát küldünk vissza
app.use((req, res, next) => {
  res.status(404).json({ error: 'Az oldal nem található!' });
});


// Egyéb hibák kezelése
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Szerver hiba!' });
});



app.listen(PORT, () => {
  console.log(`A GITART szerver a ${PORT} -on fut!`);
});