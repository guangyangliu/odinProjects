const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const passport = require('passport');
const iconv = require('iconv-lite');
const supabase = require('../config/supabase').supabase;


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
        res.redirect('/');
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
    const filesNoFolder = await prisma.File.findMany ({
        where: {
            userId: userId,
            folder: null
        },
    })
    res.render('folder', { folders: folders, files: filesNoFolder});
});
exports.showFiles = asyncHandler(async (req, res) => {
    const { folderName } = req.params;
    const userId = req.user.id; // Assuming req.user.id is available from the session

    // Find the folder and its files directly
    const folder = await prisma.Folders.findUnique({
        where: {
            folderName_userId: {
                folderName: folderName,
                userId: userId
            }
        },
        include: {
            File: true
        }
    });

    if (!folder) {
        return res.status(404).send('Folder not found');
    }

    // Files are now directly accessible from the folder object
    const files = folder.File;

    return res.render('folderFiles', { folderName: folderName, files: files });
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

    })



exports.uploadGet = asyncHandler(async (req, res) => {
    const { folderName } = req.params;
    res.render('upload', { folderName });
});

exports.uploadPost =  asyncHandler(async(req, res) => {
    if (!req.file) {
        return res.status(400).send('Please upload a file!');
    }
    const file = req.file;
    const {folderName} = req.params;
    const fileName = iconv.decode(Buffer.from(file.originalname, 'binary'), 'utf-8');
    const userId = req.user.id;

    const fileData = {
        originalname: fileName,
        size: file.size,
        user:  {connect: { id: userId }} 
    }
    if(folderName) {
        fileData.folder = {
            connect: {folderName_userId: {
                folderName: folderName,
                userId: userId
            } }
        }
    }
    const newFile = await prisma.File.create({
        data: fileData
    });

    const { data, error } = await supabase.storage.from('files').upload(`${newFile.id}`, file, {
        cacheControl: '3600',
        upsert: false
      });

  if (error) {
    throw new Error(`Upload error: ${error.message}`); // Improved error message
  };
    res.redirect('/folder');
});


exports.downloadFile = asyncHandler(async (req, res) => {
    const { fileId } = req.params;
    const { data, error } = await supabase.storage.from('files').download(fileId);

    if (error) {
        throw new Error(`Download error: ${error.message}`);
    }
    const file = await prisma.File.findUnique({
        where: {
            id: parseInt(fileId)
        },
        select: {
            originalname: true
        }
    });

    if (!file) {
        throw new Error(`File with ID ${fileId} not found.`);
    }

    // Sanitize the filename
    const sanitizedFilename = encodeURIComponent(file.originalname);
    res.setHeader('Content-Disposition', `attachment; filename="${sanitizedFilename}"`);
    res.send(data);
});