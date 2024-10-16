# GITART próbeterem és stúdió - Express szerver 

- A project egy próbaterem és stúdió honlapjának a backend megvalósítása.
    - online időpont foglalási rendszer
    - felhasználók regisztrációja, beléptetése, autentikációja
    - saját foglalások megtekintése

### Felhasznált technológiák:

- Node.js 
- Express  
- dotenv 
- path
- Jasonwebtoken
- bcrypt
- joi 



### Az alkalmazásaba útvonali:

        - token nélkül elérhető:
        
            1. /login                (POST)             
            2. /register             (POST)
            3. /users                (GET)
            4. /bookings             (GET)
            5. /rooms                (GET)
            6. /studio               (GET)
            7. /send-email           (POST)
        

        -  tokennel elérhető útvonalak:

            8. /profile              (GET)
            9 /new-booking           (POST)
            10. /own-bookings        (GET)
            11. /delete-booking/id   (DELETE)

        
    

   



