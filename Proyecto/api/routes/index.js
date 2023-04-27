const express = require('express');
const router = express.Router();

const system = require('../controllers/system');

router.get('/todo', system.todo);



module.exports = router;