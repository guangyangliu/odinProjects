const asyncHandler = require('express-async-handler');
const model = require('../model/querries');
const {body, validationResult} = require('express-validator');
const passport = require('passport');


exports.homepage = asyncHandler(async (req, res) => {
    const isLoggedIn = req.isAuthenticated();
    const messages = await model.getMessages();
    let isMember = false;
    let isAdmin = false;
    if(isLoggedIn){
        isMember = req.user.membership;
        isAdmin = req.user.admin;
    }
    res.render('homepage', {messages: messages,isLoggedIn: isLoggedIn, isMember: isMember, isAdmin: isAdmin});
});

const validateSignup = [
    body('username').trim().isEmail().withMessage('Invalid email'),
    body('password').trim().isLength({min: 6}).withMessage('Password must be at least 6 characters'),
    body('confirm_password').trim().custom((value, {req}) => value === req.body.password).withMessage('Passwords do not match'),
    body('first_name')
        .trim()
        .isLength({min: 1}).withMessage('First name is required')
        .matches(/^[A-Za-z]+$/).withMessage('First name must contain only letters')
        .customSanitizer(value => value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()),
    body('last_name')
        .trim()
        .isLength({min: 1}).withMessage('Last name is required')
        .matches(/^[A-Za-z]+$/).withMessage('Last name must contain only letters')
        .customSanitizer(value => value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()),
];

exports.signupPost = [
    validateSignup,
    asyncHandler(async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).render('signUp', {errors: errors.array()});
        }
    const {username, password, first_name, last_name} = req.body;
    const user = await model.createUser(username, password, first_name, last_name);
    req.login(user, (err) => {
        if(err) {
            return next(err);
        }
        res.redirect('/');
    })
})];


exports.joinGet = asyncHandler(async (req, res) => {
    res.render('join');
});

exports.joinPost = asyncHandler(async (req, res) => {
    const {passcode} = req.body;
    const {username} = req.user;

    if(passcode !== process.env.MEMBER_PASSCODE && passcode !== process.env.ADMIN_PASSCODE){
        return res.status(400).render('join', {errors: [{msg:'Invalid passcode'}]});
    }
    if(passcode === process.env.ADMIN_PASSCODE){
        await model.changeStatus(username, true, true);
    }
    else{
        await model.changeStatus(username, true, false);
    }
    res.redirect('/');
});

exports.loginPost = passport.authenticate('local', {failureRedirect: '/login', successRedirect: '/'});

exports.postPost = asyncHandler(async (req, res) => {
    const {title, text} = req.body;
    const {username} = req.user;
    await model.createPost(username, title, text);
    res.redirect('/');
});


exports.logout = asyncHandler(async (req, res) => {
    req.logout((err) => {
        if(err) return next(err);
        res.redirect('/');
    });
});

exports.deleteMessage = asyncHandler(async(req, res) => {
    const {id} = req.params;
    await model.deleteMessage(id);
    res.redirect('/');
})