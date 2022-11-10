const express = require('express');
const testController = require('../controllers/testController');
const router = express.Router();

router.get('/', testController.testPost_list_get);

module.exports = router;