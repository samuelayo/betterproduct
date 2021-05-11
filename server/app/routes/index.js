const express = require('express');

const router = express.Router();


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
 * @return npm {Object}. user data
 */
router.post('/user/login', (req, res) => {

})


module.exports = router;