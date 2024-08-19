**This is a homework project to practice authenticate.**

**Project description:**
https://www.theodinproject.com/lessons/node-path-nodejs-members-only

**Things you shold know before deploy this repo.**
1.Set these 5 .env varibles in .env file when deploy.
DATABASE_URL
MEMBER_PASSCODE
ADMIN_PASSCODE
SECRET
PORT

2.I use require('./model/populateModel') in app.js to set up users and messages tables.
If you want to use a different table and column to store data, you can remove this require statement and change populateModel.js file.
