const express = require('express');
const router = express.Router();

// Same endpoints ('/') but thats okay because they are different methods, one is using GET and other is using POST. 

// A signiture for each route so we know whats going on - 
//@route   GET api/auth
//@desc    Get logged in user
//@access  Private 
router.get('/',(req, res) => { // we add an endpoint/url
    res.send('Get logged in user');
});

// A signiture for each route so we know whats going on - @desc - The purpose is to authenticate and get the token so that you can access Private routes. 
//@route   POST api/auth
//@desc    Auth user & get token
//@access  Private 
router.post('/',(req, res) => { // we add an endpoint/url
    res.send('Log in user');
});

// Example, anthing that goes to (/api/auth) (on server.js) is going to basically get forwarded to this file ('./routes/auth') so in that file (auth.js) slash ('/') now pertains to (api/users).


module.exports = router;