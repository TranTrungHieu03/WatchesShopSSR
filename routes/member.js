var express = require('express');
const MemberController = require('../controller/memberController');
const authMiddleware = require('../middleware/authMiddleware');
const memberController = require('../controller/memberController');
const authController = require('../controller/authController');
var router = express.Router();

router.route("/").get(authMiddleware.ensureAuthenticated, authMiddleware.isAdmin, MemberController.getAll)
router.get("/dashboard", authMiddleware.ensureAuthenticated, authMiddleware.isAdmin, MemberController.indexView)
router.get("/:userId", authMiddleware.ensureAuthenticated, authMiddleware.isPermissionUpdate, memberController.getMember)
router.route("/update/:userId")
    .get(authMiddleware.ensureAuthenticated, authMiddleware.isPermissionUpdate, memberController.indexEdit)
    .post(authMiddleware.ensureAuthenticated, authMiddleware.isPermissionUpdate, memberController.updateProfile)
router.post("/confirm-pass/:userId", authMiddleware.ensureAuthenticated, authMiddleware.isPermissionUpdate, authController.confirmPass)
router.route("/:userId/change-pass")
    .get(authMiddleware.ensureAuthenticated, authMiddleware.isPermissionUpdate, memberController.indexChangePass)
    .post(authMiddleware.ensureAuthenticated, authMiddleware.isPermissionUpdate, authController.changePass)
    

module.exports = router;