const User = require('../../models/users.js');


const getAllUsers = async (req, res) => {
    try {
        const users = await User.find(); // lekérjük a felhasználókat
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = getAllUsers;
