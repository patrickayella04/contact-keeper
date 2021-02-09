// If you've never used express as a backend technology, we cannot use the import syntax without implementing i.e. bable or typscrypt. Otherwise we must use this syntaxt i.e. const express = require('express');, to bring in moduals, which is call Common JS. When we use React, it acutally uses ES 2015 moduals or ES6 moduals which is this current import sysntax we are using. 
const express = require('express');
// Connect Database
const connectDB = require('./config/db');
const path = require('path');

// Initialise express into a variable called app

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false })); // By adding middleware, now we can accept data( or body data for the req.body). 
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));



// Add an end point
// app.get('/', (req, res) =>
//     res.json({ msg: 'Welcome to the ContactKeeper API...' })
// );

// Define Routes - Example, anthing that goes to (/api/users) is going to basically get forwarded to this file ('./routes/users') so in that file slash ('/') now pertains to (api/users).
app.use('/api/users', require('./routes/users')); // 
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));

// Serve static assets in production - all we are doing is checking the evironment to see if its in production. Then loading a static react build folder. Then have a route to the home page, it will load the index.html page inside the client build folder.  
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')));
}

// Then this app object will have app listen method which will take in a PORT to listen on. We create a variable for the port so we can have two places to find our port. One for production and one for development. Port 5000 will be for development, where as with env.PORT it will look for an environment variable called  PORT first which will be used inn production...but we say OR (||) and say we can use any port we want i.e. 5000.
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// Just these couple of lines of code should allow us to run a server.

