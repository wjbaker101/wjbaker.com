const doAuth = (request, response, next) => {
    if (!request.isAuthenticated()) {
        response.status(401).send({ error: 'You are not authenticated.' });
    }
    else {
        next();
    }
};

const doAuthAdmin = (request, response, next) => {
    if (!request.isAuthenticated()) {
        response.status(401).send({ error: 'You are not authenticated.' });
    }
    else if (!request.session.passport.user.isAdmin) {
        response.status(403).send({ error: 'You must be an admin.' });
    }
    else {
        next();
    }
};

const doAuthNoUser = (request, response, next) => {
    if (request.isAuthenticated()) {
        response.status(403).send({ error: 'You must not be logged in.' });
    }
    else {
        next();
    }
};

module.exports = {
    doAuth,
    doAuthAdmin,
    doAuthNoUser,
}