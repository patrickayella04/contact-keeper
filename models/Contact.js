// Here we create a user schema
const mongoose = require('mongoose');

const ContactSchema = mongoose.Schema({
    // Schema takes a objec with properties that we want our user to have. They need a name which will be a string and we set it required to be true. 
    user: { // Contacts unique each user
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
       
    },
    phone: {
        type: String
      
    },
    type: {
        type: String, 
        default: 'personal'
    },
    date: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('contact', ContactSchema);