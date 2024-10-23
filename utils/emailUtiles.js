// utils/emailUtils.js

const EmailTypes = {
    REGISTRATION_SUCCESS: 'registration_success',
    BOOKING_SUCCESS: 'booking_success',
    BOOKING_CANCELLATION: 'booking_cancellation',
    LOGIN_ATTEMPT_WARNING: 'login_attempt_warning',
};

const generateEmailBody = (emailType, details, email) => {
    // Ellenőrizd, hogy az alapvető adatok megvannak-e
    if (!email || !details || !details.username) {
        return 'Hiányzó adat, az e-mail nem küldhető el.';
    }

    switch (emailType) {
        case EmailTypes.REGISTRATION_SUCCESS:
            return details.username ? `
            <div style="width: 500px">
                <h1 style="color: #111111;">Kedves ${details.username},</h1>
                <p style="color: #111111;">Sikeresen regisztrált az online teremfoglaló felületünkre!</p>
                <hr />
                <p style="color: #111111;">Üdvözlettel,</p>
                <h3 style="color: #111111;">GitArt Stúdió és Próbaterem</h3>
            </div>
            ` : 'Hiányzó adat, az e-mail nem küldhető el.';

        case EmailTypes.BOOKING_SUCCESS:
            if (!details.room || !details.date || !details.startTime || !details.endTime) {
                return 'Hiányzó adat, az e-mail nem küldhető el.';
            }
            return `
            <div style="width: 500px">
                <h1 style="color: #111111;">Kedves ${details.username},</h1>
                <p style="color: #111111;">Sikeres teremfoglalás a <strong>"${details.room}"</strong> próbateremben.</p>
                <p style="color: #111111;">A foglalás dátuma:<strong> ${details.date}</strong></p>
                <p style="color: #111111;">A foglalás dőpontja:<strong> ${details.startTime}</strong> és <strong> ${details.endTime}</strong> óra között.</p> 
                <hr />
                <p style="color: #111111;">Üdvözlettel,</p>
                <h3 style="color: #111111;">GitArt Stúdió és Próbaterem</h3>
            </div>
            `;

        case EmailTypes.BOOKING_CANCELLATION:
            if (!details.room || !details.date || !details.startTime || !details.endTime) {
                return 'Hiányzó adat, az e-mail nem küldhető el.';
            }
            return `
            <div style="width: 500px">
                <h1 style="color: #111111;">Kedves ${details.username},</h1>
                <p style="color: #111111;">A <strong>${details.date}</strong> dátumú foglalását sikeresen töröltük.</p>
                <p style="color: #111111;">A foglalás részletei:</p>
                <ul>
                    <li><p style="color: #111111;">A foglalás dőpontja:<strong> ${details.startTime}</strong> és <strong> ${details.endTime}</strong> óra között.</p></li>
                    <li><p style="color: #111111;">A foglalt terem:<strong> "${details.room}"</strong></p></li>
                </ul>
                <hr />
                <p style="color: #111111;">Üdvözlettel,</p>
                <h3 style="color: #111111;">GitArt Stúdió és Próbaterem</h3>
            </div>
            `;

        case EmailTypes.LOGIN_ATTEMPT_WARNING:
            return details.username ? `
            <div style="width: 500px">
                <h1 style="color: #111111;">Kedves ${details.username},</h1>
                <p style="color: #111111;">Túl sokszor próbált hibás jelszóval belépni a ${email} email címhez tartozó fiókjába. Kérjük, új jelszó igényléshez lépjen velünk kapcsolatba!</p>
                <p style="color: #111111;">Ha ön próbált belépni, 5 perc elteltével újra próbálkozhat a helyes jelszó megadásával!</p>
                <hr />
                <p style="color: #111111;">Üdvözlettel,</p>
                <h3 style="color: #111111;">GitArt Stúdió és Próbaterem</h3>
            </div>
            ` : 'Hiányzó adat, az e-mail nem küldhető el.';

        default:
            return 'Ismeretlen e-mail típus.';
    }
};


module.exports = { generateEmailBody, EmailTypes };
