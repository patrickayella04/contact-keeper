const express = require('express');
const router = express.Router();

// A signiture for each route so we know whats going on - 
//@route   POST api/users
//@desc    Register a user
//@access  Public
router.post('/',(req, res) => { // we add an endpoint/url
    res.send('Register a user');
});

// Example, anthing that goes to (/api/users) (on server.js) is going to basically get forwarded to this file ('./routes/users') so in that file (users.js) slash ('/') now pertains to (api/users).


module.exports = router;