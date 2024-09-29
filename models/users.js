const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema({
    UserID: { type: Number, required: true, unique: true },
    Password: { type: String, required: true },
    BookingName: { type: String, default: ''},
    LastName: { type: String, default: '' },
    FirstName: { type: String, default: '' },
    EmailAddress: { type: String, required: true, unique: true },
    PhoneNumber: { type: String, default: '' },
    PolicyAccept: { type: Boolean, required: true, default: true },

}, { timestamps: true });  // Az időbélyegzés automatikusan hozzáadódik




// Hash-eljük a jelszót mentés előtt
userSchema.pre('save', async function (next) {
    if (!this.isModified('Password')) return next();

    try {
        const salt = await bcrypt.genSalt(10);

        this.Password = await bcrypt.hash(this.Password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Jelszó ellenőrzése
userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.Password);
};
const User = mongoose.model('User', userSchema);

module.exports = User;
