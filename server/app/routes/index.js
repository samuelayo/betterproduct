const express = require('express');

const router = express.Router();

const authController = require('../controller/auth')

/**
 * This function acts as the health check route.
 */
router.get('/', (req, res) => {
    res.status(200).json({ message: 'Request Service.' });
});


/**
 * This function enables the user to log in to the system
 * @param req {object}. An express request object, which contains body, 
 * an object containing the username, password
 * @return npm {Object}. { ok: boolean -> status of request, data: object -> user data, message: string -> usually present on errors, returning error message}
 */
router.post('/user/login', async (req, res) => {
    try {
        const data = await authController.login(req);
        res.status(200).json({ ok: true, data })
    } catch (error) {
        res.status(400).json({ ok: false,  message: `Error occured while processing request with: ${ error && error.message }`})
    }
})


module.exports = router;