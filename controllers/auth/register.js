const User = require('../../models/users.js');
const userRegisterSchema = require('../../validationSchemas/userRegisterSchema');
const generateUniqueUserID = require('../../utils/generateUniqueUserID');


const register = async (req, res) => {
    const {
        Password,
        LastName,
        FirstName,
        EmailAddress,
        PhoneNumber,
        BookingName,
        PolicyAccept

    } = req.body;


    try {
         // Alakítsd a beérkezett email címet kisbetűssé
         const normalizedEmail = EmailAddress.toLowerCase();
        // Ellenőrizzük, hogy a felhasználónév vagy email már létezik-e
        const existingUser = await User.findOne( {EmailAddress: normalizedEmail} );
        if (existingUser) {
            return res.status(400).json({ message: 'Ezzel az email címmel már regisztráltak!' });
        }
        const newUserId = await generateUniqueUserID();

        const newCustomerData = {
            Password,
            BookingName,
            LastName,
            FirstName,
            EmailAddress,
            PhoneNumber,
            PolicyAccept
        }

        console.log(newCustomerData)
        // Validáljuk a beérkező adatokat
        const { error } = userRegisterSchema.validate(newCustomerData);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }


        // Új felhasználó létrehozása és mentése
        const user = new User({
            ...newCustomerData,
            UserID: newUserId,
        });
        await user.save();

        res.status(201).json({ message: 'Sikeres regisztráció' });
    } catch (error) {
        res.status(500).json({ Hiba: error.message });
    }
};

module.exports = register;