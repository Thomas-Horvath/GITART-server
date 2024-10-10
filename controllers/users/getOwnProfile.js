const User = require('../../models/users.js');

const getUserById = async (req, res) => {
  try {
    const id = req.user.id; 
     //* a dekódolt tokenből kapjuk meg
    const user = await User.findOne({ UserID: id });
    if (!user) {
      return res.status(404).json({ error: 'Felhasználó nem található!' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error('Hiba történt a felhasználó lekérdezése során:', error);
    res.status(500).json({ error: 'Hiba történt a felhasználó lekérdezése során' });
  }
};

module.exports = getUserById;
