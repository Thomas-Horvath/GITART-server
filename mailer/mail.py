import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import sys  # itt kapom meg az adtokat a spawn-ból

import io

# Kódolás beállítása az adatok fogadásához és küldéséhez
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

# SMTP kapcsolat létrehozása
smtp_server = "smtp.gmail.com" # gmailsmtp szerver címe
port = 587  # Gmail SMTP szerver portja
sender_email = sys.argv[2] 
password = sys.argv[3]       





# Az e-mail cím, amit a Node.js-ből küldünk
recipient_email = sys.argv[1]

# Üzenet létrehozása
subject = sys.argv[4]
body = sys.argv[5]





# MIMEMultipart objektum a több részből álló üzenethez (fejléc + üzenet)
msg = MIMEMultipart()
msg["From"] = sender_email
msg["To"] = recipient_email
msg["Subject"] = subject

# E-mail törzsének hozzáadása
msg.attach(MIMEText(body, "html"))

try:
    # SMTP kapcsolat megnyitása és email küldése
    with smtplib.SMTP(smtp_server, port) as server:
        server.starttls()  # Biztonságos kapcsolat létrehozása TLS-en keresztül
        server.login(sender_email, password)  # Bejelentkezés
        server.sendmail(sender_email, recipient_email, msg.as_string())  # E-mail küldése
    print("E-mail sikeresen elküldve!")
except Exception as e:
    print(f"Hiba történt az e-mail küldésekor: {str(e)}")
