const asyncHandler = require('express-async-handler');
const model = require('../model/querries');

const signup = asyncHandler(async (req, res) => {
    const {username, password, confirm_password, first_name, last_name} = req.body;
    await model.createUser(username, password, first_name, last_name);
    res.redirect('/');
});

module.exports = {signup};