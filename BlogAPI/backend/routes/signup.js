const {Router} = require('express');
const router = Router();
const {body, validationResult} = require('express-validator');
const asyncHandler = require('express-async-handler');


const validateSignup = [
    body('email').trim().isEmail().withMessage('Invalid email format'),
    body('password').trim().isLength({min: 6}).withMessage('Password must be at least 6 characters long')
];


router.post('/', validateSignup, asyncHandler(async (req, res) => {
    const errors = validationResult(req);// Validate the request body
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    const {email, password} = req.body;

    // Check if user already exists
    const existingUser = await req.context.model.user.findUnique({where: {email}});
    if (existingUser) {
        return res.status(400).json({message: 'User already exists'});
    }

    // Create new user
    const newUser = await req.context.model.user.create({
        data: {
            email,
            password // In a real application, ensure to hash the password before saving
        }
    });

    return res.status(201).json({message: 'User created successfully', user: newUser});
}));

module.exports = router;