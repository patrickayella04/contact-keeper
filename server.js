// If you've never used express as a backend technology, we cannot use the import syntax without implementing i.e. bable or typscrypt. Otherwise we must use this syntaxt i.e. const express = require('express');, to bring in moduals, which is call Common JS. When we use React, it acutally uses ES 2015 moduals or ES6 moduals which is this current import sysntax we are using. 
const express = require('express');

// Initialise express into a variable called app

const app = express();

// Add an end point
app.get('/', (req, res) =>
    res.json({ msg: 'Welcome to the ContactKeeper API...' })
);

// Define Routes - Example, anthing that goes to (/api/users) is going to basically get forwarded to this file ('./routes/users') so in that file slash ('/') now pertains to (api/users).
app.use('/api/users', require('./routes/users')); // 
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));

// Then this app object will have app listen method which will take in a PORT to listen on. We create a variable for the port so we can have to places to find our port. Once for production  and one for development. Port 5000 will be for development, where as with env.PORT it will look for an environment variable called  PORT first which will be used inn production...but we say OR (||) and say we can use any port we want i.e. 5000.
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// Just these couple of lines of code should allow us to run a server.

