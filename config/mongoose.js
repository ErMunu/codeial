const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/codeial_develpment');

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connecting database"));

db.once('open', function(){
    console.log('Connected to Database');
});

module.exports = db;