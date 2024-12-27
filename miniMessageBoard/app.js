const express = require('express');
const app = express();
const indexRoute = require('./routes/index');
const path = require("path");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({extended: true}));

app.use("/",indexRoute);
const PORT = 3000;
app.listen(PORT, ()=> console.log('Succeed'));