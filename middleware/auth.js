// Middleware is a function that has access to the request and response cycle, and the request and response object. So every time we hit an endpoint we can fire of the middleware. And we want to check to see if there is a token in the header.

const jwt = require('jsonwebtoken');
const config = require('config');

// next function just says to move on to the next piece of middleware. 
module.exports = function (req, res, next) {  // This is a middlewar fuction

    // Get token from header
    const token = req.header('x-auth-token');

    // Check if not token
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    // If there is token we need to verify it
    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        // Once its verified the payload is put into decoded. We take the user out - with the user id - then assign user to request object. 
        req.user = decoded.user; // req.user is equal to just the user in decoded(decoded is the entire token payload). Once we have the user we can use that so we have access to req.user inside the route.

        next(); // We call next() to move on.

    } catch (err) {
        // If its not valid
        res.status(401).json({ msg: 'Token is not valid' });
    }
}