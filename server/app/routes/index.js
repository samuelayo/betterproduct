const express = require('express');

const router = express.Router();

const path = require('path');

const authController = require('../controller/auth')


/**
 * This function serves the frontend 
 */
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../../client/build', 'index.html'))
});


/**
 * This function enables the user to log in to the system
 * @param req {object}. An express request object, which contains body, 
 * an object containing the username, password
 * @return npm {Object}. { ok: boolean -> status of request, userDetails: object -> user data, message: string -> usually present on errors, returning error message, token: string -> sign up token}
 */
router.post('/user/login', async (req, res) => {
    try {
        const { userDetails, token} = await authController.login(req, res);
        res.status(200).json({ ok: true, userDetails, token })
    } catch (error) {
        res.status(400).json({ ok: false,  message: `Error occured while processing request with: ${ error && error.message }`})
    }
})


/**
 * This function enables the user to log in to the system
 * @param req {object}. An express request object, which contains body, 
 * an object containing the username, password
 * @return npm {Object}. { ok: boolean -> status of request, message: string -> usually present on errors, returning error message}
 */
 router.post('/user/logout', async (req, res) => {
    try {
        await authController.logout(req, res)
        res.status(200).json({ ok: true })
    } catch (error) {
        res.status(400).json({ ok: false,  message: `Error occured while processing request with: ${ error && error.message }`})
    }
})


module.exports = router;