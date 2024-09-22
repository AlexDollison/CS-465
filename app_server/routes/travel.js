var express = require('express');
var router = express.Router();
var controller = require('../controllers/travel').default;

/* GET travel page. */
router.get('/', controller.travel);

module.exports = router;