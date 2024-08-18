const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const model = require('./model/querries');


const verify = async (username, password, done) => {
    try {
    console.log(111);
    const user = await model.getUserByUsername(username);
    if(!user) return done(null, false);
    console.log(`input${password}, db:${user.password}`);
    const match = await bcrypt.compare(password, user.password);
    if(!match) return done(null, false);
    return done(null, user);
    } catch (error) {
        return done(error);
    }
};
const strategy = new LocalStrategy(verify);
passport.use(strategy);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async(id, done) => {
    const user = await model.getUserById(id);
    done(null, user);
});