const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { body, validationResult } = require('express-validator');

const User = require('../models/User');
const Contact = require('../models/Contact')


// A signiture for each route so we know whats going on - 
//@route   Get api/contacts
//@desc    Get all users contacts
//@access  Private - you have to be logged in to get them
router.get('/',auth,(req, res) => { // we add an endpoint/url
    try { 
        // We find contacts array based on user type id. Then we sort contacts by most recent using -1.
        const contacts = await Contact.find({ user: req.user.id }).sort({ date: -1 }); 
        res.json(contacts);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Example, anthing that goes to (/api/users) (on server.js) is going to basically get forwarded to this file ('./routes/contacts') so in that file (contacts.js) slash ('/') now pertains to (api/users).

//@route   POST api/contacts
//@desc    Add new contact
//@access  Private - you have to be logged in to get them
router.post('/',(req, res) => { // we add an endpoint/url
    res.send('Add contact');
});

// For PUT we have identify which contact we update with id.
//@route   PUT api/contacts/:id 
//@desc    Update contact
//@access  Private - you have to be logged in to get them
router.put('/:id',(req, res) => { // we add an endpoint/url
    res.send('Update contact');
});

//@route   PUT api/contacts/:id 
//@desc    Delete contact
//@access  Private - you have to be logged in to get them
router.delete('/:id',(req, res) => { // we add an endpoint/url
    res.send('Delete contact');
});



module.exports = router;