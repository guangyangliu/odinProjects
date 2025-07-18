const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const models = require('./models');
const routes = require('./routes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.context = {
    models,
    me: models.users[1],
  };
  next();
});

app.use('/session', routes.session);
app.use('/users', routes.user);
app.use('/messages', routes.message);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));