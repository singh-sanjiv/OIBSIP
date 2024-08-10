const express = require('express');
const router = express.Router();
const tokenController = require('../controllers/tokenController');

router.post('/save-token', tokenController.saveToken);

module.exports = router;
