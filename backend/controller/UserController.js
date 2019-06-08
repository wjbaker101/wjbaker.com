const express = require('express');
const router = express.Router();

const userService = require('../service/UserService.js');
const auth = require('../middleware/AuthMiddleware.js');

router.use(express.json());

const multer = require('multer');
const upload = multer({
    limits: {
        fileSize: 1 * 1024 * 1024, // 1 MiB
    },
});

router.post('/user/avatar', auth.doAuth, upload.single('avatar'), async (request, response, next) => {
    try {
        const result = await userService.uploadAvatar(
                request.file.buffer, request.session.passport.user);

        response.send({ result });
    }
    catch (exception) {
        response.send({ error: exception.message });
    }
});

module.exports = router;