// Here we create a user schema
const mongoose = require('mongoose');

const UserShema = mongoose.Schema({
    // Schema takes a objec with properties that we want our user to have. They need a name which will be a string and we set it required to be true. For email we use unique because each email should be unique to its user. 
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('user', UserShema);