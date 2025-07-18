const jwt = require('jsonwebtoken');
function authorization(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader === 'undefined') {
        res.sendStatus(403); // Forbidden if token is not provided
    } else {
        const bearer = bearerHeader.split(' ');
        const token = bearer[1];
        req.token = token;
        jwt.verify(req.token, 'secretKey', async(err, authData) => {
            if (err) {
                return res.status(403).json({message: 'Forbidden: Invalid token'});
            } else {
                req.authData = authData; // Store authData for later use
                next(); // Proceed to the next middleware or route handler
            }
        });
    }
}
module.exports = authorization;