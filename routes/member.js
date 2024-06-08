var express = require('express');
const MemberController = require('../controller/memberController');
var router = express.Router();

router.route("/")
.get(MemberController.getAll)

module.exports = router;