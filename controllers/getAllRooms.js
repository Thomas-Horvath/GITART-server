const Rooms = require('../models/gitartRooms.js');

const getAllRooms = async (req, res) => {
    try {
      const rooms = await Rooms.find();
      res.status(200).json(rooms);
    } catch (error) {
      console.error('Hiba történt a próbatermek lekérdezése során:', error);
      res.status(500).json({ error: 'Hiba történt a próbatermek lekérdezése során' });
    }
  };

module.exports = getAllRooms;
