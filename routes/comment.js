var express = require('express');
const CommentController = require('../controller/commentController');
var router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');


router.route("/")
.get(authMiddleware.ensureAuthenticated,CommentController.getAllComments)

router.route("/:watchId")
// .get(authMiddleware.ensureAuthenticated,)
.post(authMiddleware.ensureAuthenticated,CommentController.createComment)

module.exports = router;