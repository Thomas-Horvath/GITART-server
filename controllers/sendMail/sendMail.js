const { spawn } = require('child_process');
const { generateEmailBody } = require('../../utils/emailUtiles');
require('dotenv').config();

const sendEmail = async (req, res) => { 
    const recipientEmail = req.body.email;
    const emailType = req.body.emailType;


    const details = req.body.details;
    const subject = req.body.subject;
    const body = generateEmailBody(emailType, details,recipientEmail);


    const senderEmail = process.env.SENDER_EMAIL; // Küldő email cím
    const appPassword = process.env.SENDER_PASSWORD; // Alkalmazás jelszó
   


    if (!recipientEmail) {
        return res.status(400).json({ message: 'Címzett email megadása kötelező!' });
    }
    if (body === 'Hiányzó adat, az e-mail nem küldhető el.') {
        return res.status(400).json({ message: 'Hiányzó adat, az email nem küldhető el!' });
    }
    

    // Python szkript futtatása
    const pythonProcess = spawn('python3', ['mailer/mail.py', recipientEmail, senderEmail, appPassword, subject, body]);

    // Hibák tárolása
    let errorMessage = '';

    // Python kimenet feldolgozása
    pythonProcess.stdout.setEncoding('utf-8');
    pythonProcess.stdout.on('data', (data) => { 
        console.log(`Python kimenet: ${data}`);
    });
    
    pythonProcess.stderr.setEncoding('utf-8');
    pythonProcess.stderr.on('data', (data) => { 
        console.error(`Hiba történt a Python szkriptben: ${data}`);
        errorMessage += data.toString();
    });

    pythonProcess.on('close', (code) => {
        if (code === 0 && !errorMessage) {
            res.status(200).json({ message: 'E-mail sikeresen elküldve!' });
        } else {
            res.status(500).json({ message: 'Hiba történt az e-mail küldésekor.' });
        }
    });
};



module.exports = sendEmail;