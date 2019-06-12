const express = require('express');
const app = express();
const path = require('path');

const history = require('connect-history-api-fallback');

const cookieSession = require('cookie-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const secretProperties = require('../secret-properties.json');

const userService = require('./service/UserService.js');

app.use(cookieSession({
    name: 'auth-session',
    keys: [ secretProperties.authentication['session-secret'] ],
    maxAge: 24 * 60 * 60 * 1000,
    saveUninitialized: false,
    resave: false,
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
},
async (username, password, done) => {
    try {
        const user = await userService.getUser(username, password);

        if (user !== null) {
            done(null, user);
        }
        else {
            done(null, false, { message: 'Invalid username or password' });
        }
    }
    catch(exception) {
        done(null, false, { message: 'Failed to log in' });
    }
}));

passport.serializeUser((user, done) => {
    done(null, {
        id: user.id,
        isAdmin: user.isAdmin,
    });
});

passport.deserializeUser(async (user, done) => {
    const deserialisedUser = await userService.getUserByID(user.id);

    done(null, deserialisedUser);
});

const controllers = [
    require('./controller/AuthController.js'),
    require('./controller/BlogController.js'),
    require('./controller/ProjectController.js'),
    require('./controller/UserController.js'),
];

controllers.forEach(controller => {
    app.use('/api', controller);

    controller.stack
            .filter(r => r && r.route && r.route.path)
            .map(r => r.route.path)
            .forEach(p => console.log(`Exposing: /api${p}`));
});

app.use('/static-resources', express.static(path.join(__dirname, 'static-resources')));

app.use(history());

app.use(express.static(path.join(__dirname, 'frontend')));

app.listen(8082, () => {
    console.log('Started application in port: 8082');
});