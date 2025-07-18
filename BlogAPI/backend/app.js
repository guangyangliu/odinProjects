const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const routes = require('./routes');
const cors = require('cors');


const {PrismaClient} = require('@prisma/client');
const model = new PrismaClient();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    req.context = {
        model
    };
    next();
})

app.use('/user', routes.user);
app.use('/post', routes.post);
app.use('/signup', routes.signup);
app.use('/login', routes.login)
app.use('/homepage', routes.homepage)
app.use('/comment', routes.comment);


app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));