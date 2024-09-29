const Studio = require('../models/gitartStudio.js');

const getStudio = async (req, res) => {
    try {
      const studio = await Studio.find();
    
      res.status(200).json(studio);
    } catch (error) {
      console.error('Hiba történt a stúdió adatainak lekérdezése során:', error);
      res.status(500).json({ error: 'Hiba történt a stúdió adatainak lekérdezése során' });
    }
  };

module.exports = getStudio;