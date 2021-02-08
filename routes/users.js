const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { body, validationResult } = require('express-validator');

const User = require('../models/User');

// A signiture for each route so we know whats going on - 
//@route   POST api/users (this is an endpoint respresented as '/' in the router.post below)
//@desc    Register a user
//@access  Public
router.post(
    '/',
    
        body('name', 'Please add name')
            .not()
            .isEmpty(), 
        body('email', 'Please include a valid email').isEmail(), 
        body('password', 'Please enter a password with 6 or more characters')
        .isLength({ min: 6 })
,
    async (req, res) => { // we add an endpoint/url
    //res.send(req.body); // In order to use req.body we need to add a piece of middleware to our server.js.
        const errors = validationResult(req);
        console.log(errors)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        } 
        
        const { name, email, password } = req.body
        
        try { // see if email exists already (findOne())
            let user = await User.findOne({ email });

            if (user) {
                return res.status(400).json({ msg: 'User already exists' });
            }
            user = new User({
                name,
                email,
                password
            });

            // encrypt password/ hass password with bcrypt
            const salt = await bcrypt.genSalt(10); // determins how secure salt is.Then we take that salt and hash the password.

            user.password = await bcrypt.hash(password, salt) // this gives use a hashed version of the user.password which we are then asigning to the user object above. 

            // to save it to the database 
            await user.save();

            // payload is the object we want to send in the token (jwt)
            const payload = {
                user: {
                    id: user.id // we can access all contacts user has from user id
                }
            }

            // To generate a token we have to sign it. 
            jwt.sign(
                payload,
                config.get('jwtSecret'),
            {
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

// Example, anthing that goes to (/api/users) (on server.js) is going to basically get forwarded to this file ('./routes/users') so in that file (users.js) slash ('/') now pertains to (api/users).


module.exports = router;