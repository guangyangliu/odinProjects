1.Set these 5 .env varibles in .env file when deploy.
DATABASE_URL
MEMBER_PASSCODE
ADMIN_PASSCODE
SECRET
PORT

2.I use require('./model/populateModel') in app.js to set up users and messages tables.
If you want to change and set up your own table, populateModel file could be a reference.
