const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth'); // We pass this in as a second paremeter
const { check, validationResult } = require('express-validator');

const User = require('../models/User');

// Same endpoints ('/') but thats okay because they are different methods, one is using GET and other is using POST. 

// A signiture for each route so we know whats going on - 
//@route   GET api/auth
//@desc    Get logged in user
//@access  Private 
router.get('/', auth, async (req, res) => { // we add an endpoint/url
    
    try {
        // Get user from database
        const user = await User.findById(req.user.id).select('-password') // .select() let us stop the return of the password. We only want the id. 
        res.json(user);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error')
    }

});

// A signiture for each route so we know whats going on - @desc - The purpose is to authenticate and get the token so that you can access Private routes. 
//@route   POST api/auth
//@desc    Auth user & get token
//@access  Private 
router.post(
    '/',
    [
    check('email', 'Please include a valid email').isEmail(), 
    check('password', 'Password is required').exists()
    ],
    async (req, res) => { // we add an endpoint/url
    const errors = validationResult(req);
    console.log(errors)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
        } 
        

        const { email, password } = req.body;

        try {
            let user = await User.findOne({ email });

            if (!user) {
                return res.status(400).json({ msg: 'Invalid Credentials' });
            }

            // If there is a user we want to continue to check the password also. We do this using the bcrypt.compare(), method. Method takes in the password variable that comes in from the body and the hash password that is the user that was found, their password that was stored in the data base. So we will return either true or false if they match. 
            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(400).json({msg: 'Invalid Credentials'})
            }
            // payload is the object we want to send in the token (jwt)
            const payload = {
                user: {
                    id: user.id // we can access all contacts user has from user id
                }
            }

            // To generate a token we have to sign it. 
            jwt.sign(payload, config.get('jwtSecret'), {
                expiresIn: 360000
            },
            
                (err, token) => {
                    if (err) throw err;
                    res.json({ token });
            }); // Always put secret inside config(check default.json folder)

        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');

        }
    }
);

// Example, anthing that goes to (/api/auth) (on server.js) is going to basically get forwarded to this file ('./routes/auth') so in that file (auth.js) slash ('/') now pertains to (api/users).


module.exports = router;