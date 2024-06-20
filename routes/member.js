var express = require('express');
const MemberController = require('../controller/memberController');
const authMiddleware = require('../middleware/authMiddleware');
const memberController = require('../controller/memberController');
var router = express.Router();

router.route("/").get(authMiddleware.ensureAuthenticated,authMiddleware.isAdmin, MemberController.getAll)
router.get("/dashboard", authMiddleware.ensureAuthenticated, authMiddleware.isAdmin, MemberController.indexView)
router.get("/:userId", authMiddleware.ensureAuthenticated, memberController.getMember)


module.exports = router;