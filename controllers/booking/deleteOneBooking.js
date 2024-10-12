// controllers/deleteBookingController.js
const Booking = require('../../models/booking'); // A Booking modell importálása

// Foglalás törlése az ID alapján
const deleteBooking = async (req, res) => {
    const id = req.params.id; 

    try {
        const deletedBooking = await Booking.findByIdAndDelete(id);

        if (!deletedBooking) {
            return res.status(404).json({ message: 'A foglalás nem található.' });
        }

        res.status(200).json({ message: 'Foglalás sikeresen törölve.', deletedBooking });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Hiba a foglalás törlése során.', error });
    }
};

module.exports = { deleteBooking };
