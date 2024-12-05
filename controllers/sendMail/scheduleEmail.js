// const mongoose = require('mongoose');
const schedule = require('node-schedule');
const Booking = require('../../models/booking');
const User = require('../../models/users');
const { spawn } = require('child_process');
const { generateEmailBody } = require('../../utils/emailUtiles');
require('dotenv').config();



// E-mail küldő függvény
const sendReminderEmail = (recipientEmail, subject, body) => {
    const senderEmail = process.env.SENDER_EMAIL;
    const appPassword = process.env.SENDER_PASSWORD;

    const pythonProcess = spawn('python3', ['mailer/mail.py', recipientEmail, senderEmail, appPassword, subject, body]);

    pythonProcess.stdout.setEncoding('utf-8');
    pythonProcess.stdout.on('data', (data) => {
        console.log(`Python kimenet: ${data}`);
    });


    pythonProcess.stderr.setEncoding('utf-8');
    pythonProcess.stderr.on('data', (data) => {
        console.error(`Python hiba: ${data}`);
    });

    pythonProcess.on('close', (code) => {
        if (code === 0) {
            console.log('Emlékeztető e-mail sikeresen elküldve!');
        } else {
            console.error('Hiba történt az e-mail küldésekor.');
        }
    });
};

// Foglalások ellenőrzése és emlékeztető küldés
const checkAndSendReminders = async () => {
    try {
        const now = new Date(); //* ez egy órával kevesebbet ad vissza a hlyei időnél 
     

        // Foglalások lekérdezése
        const bookings = await Booking.find({ ReminderSent: false }); // Csak azok a foglalások, amelyekhez még nem küldtünk emlékeztetőt



        for (const booking of bookings) {
            // Foglalási időpont létrehozása a BookingDate és az Hours[0] alapján
            const bookingDateTime = new Date(booking.BookingDate);
            bookingDateTime.setHours(booking.Hours[0], 0, 0, 0); // Az első óra alapján beállítva
            


            // 24 órával az esemény előtt számított idő
            const reminderTime = new Date(bookingDateTime);
            reminderTime.setHours(reminderTime.getHours() - 24);
         


            console.log(reminderTime, bookingDateTime, now);



            // Ellenőrzés: ha most van az emlékeztető küldési időpontja 
            if (now >= reminderTime && now < bookingDateTime) {

                // Felhasználó lekérdezése
                const user = await User.findOne({ UserID: booking.UserID });

                if (user) {
                    const subject = `Emlékeztető foglalásról!`;
                    const emailType = "reminder_email";
                    const details = {
                        "username": `${user.LastName} ${user.FirstName}`,
                        "room": booking.Room,
                        "date": booking.BookingDate.toLocaleDateString(),
                        "startTime": booking.Hours[0],
                        "endTime": booking.Hours[booking.Hours.length - 1] + 1 // Az utolsó óra a legnagyobb indexen van
                    };
                    const recipientEmail = user.EmailAddress;
                    const body = generateEmailBody(emailType, details, recipientEmail);

                    sendReminderEmail(recipientEmail, subject, body);

                    // Foglalás frissítése, hogy jelezzük, hogy az e-mailt elküldtük
                    booking.ReminderSent = true;
                    await booking.save(); // Mentsük el a változtatásokat
                } else {
                    console.error(`Felhasználó nem található a UserID: ${booking.UserID} alapján.`);
                }
            }
        };
    } catch (error) {
        console.error('Hiba a foglalások ellenőrzésekor:', error);
    }
};


// Ütemezés: minden óra 5. percében ellenőrzi a foglalásokat
schedule.scheduleJob('5 * * * *', () => {
    console.log('Foglalások ellenőrzése...' , new Date());
    checkAndSendReminders();
});
  
