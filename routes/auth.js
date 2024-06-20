var express = require('express');
const authController = require('../controller/authController');
var router = express.Router();


router.route("/signup")
    .get(authController.indexSignup)
    .post(authController.signUp)

router.route("/login")
    .get(authController.indexLogin)
    .post(authController.login)
router.get("/logout", authController.logout)

module.exports = router;