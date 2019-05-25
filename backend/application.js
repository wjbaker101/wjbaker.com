const express = require('express');
const app = express();

const cookieSession = require('cookie-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const secretProperties = require('../secret-properties.json');

const userService = require('./service/UserService.js');

app.use(cookieSession({
    name: 'auth-session',
    keys: [ secretProperties.authentication['session-secret'] ],
    maxAge: 24 * 60 * 60 * 1000,
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
},
async (username, password, done) => {
    const user = await userService.getUser(username, password);

    if (user !== null) {
        done(null, user);
    }
    else {
        done(null, false, { error: 'Invalid username or password.' });
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
    require('./controller/ProjectController.js'),
    require('./controller/AuthController.js'),
];

controllers.forEach(controller => {
    app.use('/api', controller);
});

app.listen(8082, () => {
    console.log('Started application in port: 8082')
});