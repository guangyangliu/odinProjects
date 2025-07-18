const {Router} = require('express');
const router = Router();
const jwt = require('jsonwebtoken');

router.post('/', async (req, res) => {
    const{email, password} = req.body;
    const user = await req.context.model.user.findUnique({
        where: {email, password}
    });
    if (!user) {
        return res.status(401).json({message: 'Invalid email or password'});
    }
    // Generate JWT token
    const token = jwt.sign({user}, "secretKey");
    return res.status(200).json({message: 'Login successful', token, id: user.id});
})

module.exports = router;