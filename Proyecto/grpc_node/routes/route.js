const express = require('express');
const router = express.Router();

const system = require('../controllers/system');

router.get('/sendgRPC', system.send);


module.exports = router;