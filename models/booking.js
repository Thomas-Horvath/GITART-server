// models/booking.js
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    UserID: {
        type: String,
        required: true,
    },
    BookingDate: {
        type: Date,
        required: true,
    },
    Room: {
        type: String,
        required: true,
    },
    Hours: {
        type: [Number],
        required: true,
    },
    Name: {
        type: String,
        required: true,
    },
    BookingName: {
        type: String,
        required: true,
    },
    ReminderSent: {
        type: Boolean,
        default: false
    },
}, { timestamps: true });

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
