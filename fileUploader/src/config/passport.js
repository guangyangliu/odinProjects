const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const {PrismaClient} = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

const verify = async(username, password, done) => {
  try {
    const user = await prisma.user.findUnique({
        where: {
            username:username,
        }
    });
    if(!user) return done(null, false);
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
})

passport.deserializeUser(async(id, done) => {
    const user = await prisma.user.findUnique({
        where: {
            id:id,
        }
    })
    done(null, user);
})