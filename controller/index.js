const asyncHandler = require('express-async-handler');
const model = require('../model/querries');
const {body, validationResult} = require('express-validator');

const validateSignup = [
    body('username').trim().isEmail().withMessage('Invalid email'),
    body('password').trim().isLength({min: 6}).withMessage('Password must be at least 6 characters'),
    body('confirm_password').trim().custom((value, {req}) => value === req.body.password).withMessage('Passwords do not match'),
    body('first_name').trim().isLength({min: 1}).withMessage('First name is required')
        .matches(/^[A-Za-z]+$/).withMessage('First name must contain only letters'),
    body('last_name').trim().isLength({min: 1}).withMessage('Last name is required')
        .matches(/^[A-Za-z]+$/).withMessage('Last name must contain only letters'),
];

exports.signupPost = [
    validateSignup,
    asyncHandler(async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).render('signUp', {errors: errors.array()});
        }
    const {username, password, first_name, last_name} = req.body;
    await model.createUser(username, password, first_name, last_name);
    res.redirect('/join');
})];


exports.joinPost = asyncHandler(async (req, res) => {
    const {passcode} = req.body;
    if(passcode !== process.env.PASSCODE){
        return res.status(400).render('join', {errors: [{msg:'Invalid passcode'}]});
    }
    res.redirect('/');
});