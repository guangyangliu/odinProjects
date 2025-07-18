const {Router} = require('express');
const router = Router();
const jwt = require('jsonwebtoken');
const findToken = require('../utils/findtoken');

router.get('/', findToken, async (req, res) => {
    jwt.verify(req.token, 'secretKey', async (err, authData) => {
        if (err) {
            return res.status(403).json({message: 'Forbidden: Invalid token'});
        }
        const user = await req.context.model.user.findUnique({
            where: {id: authData.user.id}
        });
        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }
        return res.json({message: 'Welcome to the homepage', user});
    });
})

module.exports = router;