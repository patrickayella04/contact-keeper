const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');
const Contact = require('../models/Contact');
const { restart } = require('nodemon');


// A signiture for each route so we know whats going on - 
//@route   Get api/contacts
//@desc    Get all users contacts
//@access  Private - you have to be logged in to get them
router.get('/',auth, async (req, res) => { // we add an endpoint/url
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
router.post('/',
    [
    auth, 
        [
            check('name', 'Name is required')
                .not()
                .isEmpty()
        ]
    ],
    async (req, res) => { // we add an endpoint/url
        const errors = validationResult(req);
        console.log(errors)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        } 
        const { name, email, phone, type } = req.body;

        try {
            const newContact = new Contact({
                name,
                email,
                phone,
                type,
                user: req.user.id
            });

            // Save new instance of contact in data base
            const contact = await newContact.save();

            res.json(contact);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

// For PUT we have identify which contact we update with id.
//@route   PUT api/contacts/:id 
//@desc    Update contact
//@access  Private - you have to be logged in to get them
router.put('/:id', auth, async (req, res) => { // we add an endpoint/url
    const { name, email, phone, type } = req.body;


    // Build contact object -
    // Check if these fields are submitted and then add to the contact fields
    const contactFields = {};
    if (name) contactFields.name = name;
    if (email) contactFields.email = email;
    if (phone) contactFields.phone = phone;
    if (type) contactFields.type = type;

    try {
        // We access parameters like '/:id' using req.params.id which will find the contact by id. 
        let contact = await Contact.findById(req.params.id); 

        if (!contact) return res.status(404).json({ msg: 'Contact not found' });

        // We need to make sure the user owns the contact. We dont want someone else to update anyone elses contact. (req.user.id is a string, so we convert contact.user to a string also with stString())
        if (contact.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        //Options Object: 1. ($set) Update contact: 2. (new) If its a new contact true, then just create it.
        contact = await Contact.findByIdAndUpdate(req.params.id,
            { $set: contactFields },
            { new: true });
        
        res.json(contact) // we send new/updated contact
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }


});

//@route   PUT api/contacts/:id 
//@desc    Delete contact
//@access  Private - you have to be logged in to get them
router.delete('/:id', auth, async (req, res) => { // we add an endpoint/url
    

    try {
        // We access parameters like '/:id' using req.params.id which will find the contact by id. 
        let contact = await Contact.findById(req.params.id); 

        if (!contact) return res.status(404).json({ msg: 'Contact not found' });

        // We need to make sure the user owns the contact. We dont want someone else to update anyone elses contact. (req.user.id is a string, so we convert contact.user to a string also with stString())
        if (contact.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        
        await Contact.findByIdAndRemove(req.params.id);
            
        
            res.json({ msg: 'Contact removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

});



module.exports = router;