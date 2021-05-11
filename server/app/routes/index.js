const express = require('express');

const router = express.Router();


/**
 * This function acts as the health check route.
 */
router.get('/', (req, res) => {
    res.status(200).json({ message: 'Request Service.' });
});


module.exports = router;