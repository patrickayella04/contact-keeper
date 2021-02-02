const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

const User = require('../models/User');

// A signiture for each route so we know whats going on - 
//@route   POST api/users(this is an endpoint respresented as '/' in the router.post below)
//@desc    Register a user
//@access  Public
router.post('/', [
    body('name', 'Please add name')
        .not()
        .isEmpty(), 
    body('email', 'Please include a valid email').isEmail(), 
    body('password', 'Please enter a password with 6 or more characters').isLength({ min: 6  })
],
    (req, res) => { // we add an endpoint/url
    //res.send(req.body); // In order to use req.body we need to add a piece of middleware to our server.js.
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        res.send('passed');
    }
);

// Example, anthing that goes to (/api/users) (on server.js) is going to basically get forwarded to this file ('./routes/users') so in that file (users.js) slash ('/') now pertains to (api/users).


module.exports = router;