const Booking = require('../../models/booking');


const getUserBookings = async (req, res) => {
    const id = req.user.id;

    try {
        // Ellenőrizzük, hogy a userID létezik-e
        if (!id) {
            return res.status(400).json({ message: 'A userID megadása kötelező!' });
        }

        // Foglalások lekérdezése
        const bookings = await Booking.find({ UserID: id });

        if (!bookings.length) {
            return res.status(404).json({ message: 'Nincs foglalás a megadott felhasználóhoz.' });
        }

        res.status(200).json(bookings); // Válasz küldése
    } catch (error) {
        console.error('Hiba a foglalások lekérdezésekor:', error);
        res.status(500).json({ message: 'Belső hiba történt.' });
    }
};

module.exports = { getUserBookings };
