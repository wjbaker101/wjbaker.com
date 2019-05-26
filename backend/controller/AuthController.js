const express = require('express');
const router = express.Router();

const passport = require('passport');

const userService = require('../service/UserService.js');
const auth = require('../middleware/AuthMiddleware.js');

router.use(express.json());

router.post('/auth/login', auth.doAuthNoUser, (request, response, next) => {
    passport.authenticate('local', (error, user, info) => {
        if (error) {
            return next(error);
        }

        if (!user) {
            return response
                    .status(400)
                    .send({ error: `Unable to log in. ${info.message}.` });
        }

        request.login(user, (error) => {
            response.send({ result: 'Successfully logged in.' });
        });
    })(request, response, next);
});

router.get('/auth/logout', (request, response) => {
    request.logout();
    response.clearCookie('connect.sid');
    response.send({ result: 'Successfully logged out.' });
});

router.get('/auth/user', auth.doAuth, async (request, response) => {
    const user = await userService
            .getUserByID(request.session.passport.user.id);

    response.send({ result: user });
});

module.exports = router;