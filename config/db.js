const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async () => {
    // Clearner code with async await and try catch. 
    try {
        await mongoose.connect(db, {
            // Parameters added to avoid warnings in the version of mongoose. How you might not need these after a certain version.
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false
        });

        console.log('MongoDB Connected...')
    } catch (err) {
        console.error(err);
        process.exit(1); // Will Exit with failure
    }

    // Less cleaner code -
    // mongoose.connect(db, {
    //     // Parameters added to avoid warnings in the version of mongoose. How you might not need these after a certain version.
    //     useNewUrlParser: true,
    //     useCreateIndex: true,
    //     useFindAndModify: false
    // })
    //     .then(() => console.log('MongoDB Connected'))
    //     .catch(err => {
    //         console.error(err);
    //         process.exit(1); // Will Exit with failure
    //     });
};

module.exports = connectDB;