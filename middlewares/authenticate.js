// Token ellenőrzése middleware-ben
const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'Nincs token, jelentkezzen be!' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Érvénytelen token' });
        }
        req.user = decoded;
        next();
    });
};

module.exports = authenticate;