const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressEjsLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');

//user dor session cookie and authencation
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local');
const passportJWT = require('./config/passport-jwt');
const passportGgoogle = require('./config/passport-google');

const MongoStore = require('connect-mongo');
const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const customMware = require('./config/middleware');

const chatServer = require('http').Server(app);
const chatSockets = require('./config/chat_sockets').chatSockets(chatServer);

chatServer.listen(5000);
console.log("chat server is listining on port 5000", chatSockets);


app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}))

app.use(express.urlencoded());
app.use(cookieParser());

app.use(express.static('./assets'));
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use(expressEjsLayouts);

//extract style and script
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


//setup view engine
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(session({
    name: 'codeial',
    // Todo change secret key
    secret: 'muntazirneha',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: MongoStore.create({
        mongoUrl: 'mongodb://localhost/codeial_develpment',
        autoRemove: 'disabled'
    }, function (err) {
        console.log(err || 'connect mongo setup ok')
    })
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);


//router
app.use('/', require('./routes'))

app.listen(port, function (err) {
    if (err) {
        console.log(`Error : ${err}`);
    }

    console.log(`Server is running on port : ${port}`);
});