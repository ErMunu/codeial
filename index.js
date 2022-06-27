const express = require('express');
const app = express();
const port = 8000;
const expressEjsLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');

app.use(express.static('./assets'));
app.use(expressEjsLayouts);

//extract style and script
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//router
app.use('/', require('./routes'))

app.set('view engine', 'ejs');
app.set('views', './views');

app.listen(port, function(err){
    if(err){
        console.log(`Error : ${err}`);
    }

    console.log(`Server is running on port : ${port}`);
});