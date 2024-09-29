const Booking = require('../../models/booking');

// Új foglalás létrehozása
const createBooking = async (req, res) => {
    try {
        const { UserID, BookingDate, Room, Hours, Name, BookingName} = req.body;

        // Ellenőrzés, hogy minden szükséges adat megvan-e
        if  (!UserID || !BookingDate || !Room || !Hours || !Name || !BookingName)  {
            return res.status(400).json({ message: 'Minden mezőt ki kell tölteni.' });
        }

        // Új foglalás létrehozása
        const newBooking = new Booking({
            UserID,
            BookingDate,
            Room,
            Hours,
            Name,
            BookingName
        });

        // Foglalás mentése
        await newBooking.save();
        return res.status(201).json({ message: 'Foglalás sikeresen létrehozva!', booking: newBooking });
    } catch (error) {
        return res.status(500).json({ message: 'Hiba történt a foglalás során.', error: error.message });
    }
};


module.exports = { createBooking };





// // Foglalások lekérdezése
// exports.getBookings = async (req, res) => {
//     try {
//         const bookings = await Booking.find();
//         return res.status(200).json(bookings);
//     } catch (error) {
//         return res.status(500).json({ message: 'Hiba történt a foglalások lekérdezése során.', error: error.message });
//     }
// };

// // Foglalás frissítése
// exports.updateBooking = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { userID, bookingDate, room, hours, name, bookingName } = req.body;

//         const updatedBooking = await Booking.findByIdAndUpdate(
//             id,
//             { userID, bookingDate, room, hours, name, bookingName },
//             { new: true }
//         );

//         if (!updatedBooking) {
//             return res.status(404).json({ message: 'Foglalás nem található.' });
//         }

//         return res.status(200).json({ message: 'Foglalás sikeresen frissítve!', booking: updatedBooking });
//     } catch (error) {
//         return res.status(500).json({ message: 'Hiba történt a foglalás frissítése során.', error: error.message });
//     }
// };

// // Foglalás törlése
// exports.deleteBooking = async (req, res) => {
//     try {
//         const { id } = req.params;

//         const deletedBooking = await Booking.findByIdAndDelete(id);

//         if (!deletedBooking) {
//             return res.status(404).json({ message: 'Foglalás nem található.' });
//         }

//         return res.status(200).json({ message: 'Foglalás sikeresen törölve!' });
//     } catch (error) {
//         return res.status(500).json({ message: 'Hiba történt a foglalás törlése során.', error: error.message });
//     }
// };
