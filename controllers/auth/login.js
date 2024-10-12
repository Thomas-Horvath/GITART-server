const jwt = require('jsonwebtoken');
const User = require('../../models/users.js');


//* Bejelentkezés és token generálás

const login = async (req, res) => {
    const { EmailAddress, Password, LoginAttempts } = req.body;

    try {
        // Ellenőrizzük, hogy létezik-e a felhasználó
        const user = await User.findOne({ EmailAddress });
        if (!user) {
            // Ha az email cím hibás
            return res.status(401).json({ message: 'Hibás email cím!' });
        }

        // Ellenőrizzük a jelszót
        const isPasswordValid = await user.comparePassword(Password);
        if (!isPasswordValid) {
            if (LoginAttempts === 4) {
                console.log('Túl sok sikertelen bejelentkezési kísérlet. Küldjünk email!!');
            }
            return res.status(401).json({ message: 'Hibás jelszó!' });
        }

        const token = jwt.sign(
            { id: user.UserID, EmailAdress: user.EmailAddress },
            process.env.JWT_SECRET, // Titkos kulcs a tokenekhez a .env fájlból
            { expiresIn: '24h' } // Token lejárati idő
        );

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



module.exports = login;
