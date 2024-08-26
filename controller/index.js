const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const passport = require('passport');


const validateSignup = [
    body('username').trim().isEmail().withMessage('Invalid email'),
    body('password').trim().isLength({min: 6}).withMessage('Password must be at least 6 characters'),
    body('confirmPassword').trim().custom((value, {req}) => value === req.body.password).withMessage('Passwords do not match'),
]

exports.signupPost = [
    validateSignup,
    asyncHandler(async(req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).render('signup', {errors: errors.array()});
        }
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.User.create({
            data: {
              username: username,
              password: hashedPassword,
            }
    });
    req.login(user, (err) => {
        if(err) {
            return next(err);
        }
        res.redirect('/upload');
    })
})
]

exports.loginPost = passport.authenticate('local', {failureRedirect: '/login', successRedirect: '/'});


exports.createFolder = asyncHandler(async (req, res) => {
    const { folderName } = req.body;
    const userId = req.user.id; // Assuming req.user.id is available from the session
    const folder = await prisma.Folders.create({
        data: {
            folderName: folderName,
            userId: userId,
        },
    });
    res.redirect('/folder');
});

exports.showFolders = asyncHandler(async (req, res) => {
    const userId = req.user.id; // Assuming req.user.id is available from the session
    const folders = await prisma.Folders.findMany({
        where: {
            userId: userId,
        },
        select: {
            folderName: true,
        },
    });
    res.render('folder', { folders: folders });
});

exports.deleteFolder = asyncHandler(async (req, res) => {
    const { folderName } = req.params;
    const userId = req.user.id; // Assuming req.user.id is available from the session
    const folder = await prisma.Folders.delete({
        where: {
            folderName_userId: {
                folderName: folderName,
                userId: userId,
            },
        },
    });
    res.redirect('/folder');
});





exports.updateGet = asyncHandler(async (req, res) => {
    const { folderName } = req.params;
    const userId = req.user.id; // Assuming req.user.id is available from the session
    const folder = await prisma.Folders.findUnique({
        where: {
            folderName_userId: {
                folderName: folderName,
                userId: userId,
            },
        },
        select: {
            folderName: true,
        },
    });
    if (!folder) {
        return res.status(404).send('Folder not found');
    }
    res.render('update', { folder: folder });
});

exports.updatePost = asyncHandler(async (req, res) => {
    const { folderName } = req.params;
    const { folderName: newFolderName } = req.body;
    const userId = req.user.id; // Assuming req.user.id is available from the session
    const folder = await prisma.Folders.update({
        where: {
            folderName_userId: {
                folderName: folderName,
                userId: userId,
            },
        },
        data: {
            folderName: newFolderName,
        },
    });
    res.redirect('/folder');
});

exports.uploadPost =  asyncHandler(async(req, res) => {
    if (!req.file) {
        return res.status(400).send('Please upload a file!');
    }
    const { filename, originalname, size } = req.file;
    const newFile = await prisma.File.create({
        data: {
            fileName: filename,
            originalFileName: originalname,
            size: size,
        },
    });
    res.status(201).send(`File uploaded successfully: ${originalname}`);
});