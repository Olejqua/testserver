'use strict';

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); // Для работы с телом запроса
const path = require('path');

const items = require('./routes/api/items');

const app = express();

// BodyParser Middleware
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, PATCH");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// DB Config
const db = require('./config/keys').mongoURI;

// Connect ti Mongo
mongoose
    .connect(db)
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log('err'));

// Use routes
app.use('/api/items', items);



// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));

// app.listen(5000, function () {
//     console.log('CORS-enabled web server listening on port 5000')
// });

