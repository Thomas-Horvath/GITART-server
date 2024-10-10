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
        
            1. /login            (POST)             
            2. /register         (POST)
            3. /users            (GET)
            4. /bookings         (GET)
            5. /rooms            (GET)
            6. /studio           (GET)
        

        -  tokennel elérhető útvonalak:

            7. /profile          (GET)
            8 /new-booking       (POST)
            9. /own-bookings     (GET)
        
    

   



