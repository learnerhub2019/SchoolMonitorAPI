const express = require('express')
const router = express.Router()

router.get('/', ( req, res) => {
    res.send('School Api');
});

module.exports = router;