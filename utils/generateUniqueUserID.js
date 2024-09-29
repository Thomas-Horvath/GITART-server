const User = require('../models/users.js');

const generateUniqueUserID = async () => {
    const min = 100000; // Minimum 6 jegyű szám
    const max = 999999; // Maximum 6 jegyű szám

    while (true) {
        // Generálj egy véletlenszerű 6 jegyű számot
        const randomID = Math.floor(Math.random() * (max - min + 1)) + min;

        // Ellenőrizd, hogy létezik-e már az adatbázisban
        const existingUser = await User.findOne({ UserID: randomID });
        if (!existingUser) {
            return randomID; // Ha egyedi, térj vissza a generált ID-vel
        }
        // Ha nem egyedi, generálj újat
    }
};

module.exports = generateUniqueUserID;
