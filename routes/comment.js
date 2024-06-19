var express = require('express');
const CommentController = require('../controller/commentController');
var router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.route("/")
.get(CommentController.getAllComments)

module.exports = router;