// controllers/bookingController.js
const Booking = require('../../models/booking'); // A Booking modell importálása

// Összes foglalás lekérdezése
const getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find();
        res.status(200).json(bookings);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Hiba a foglalások lekérdezése során.', error });
    }
};

module.exports = { getAllBookings };
