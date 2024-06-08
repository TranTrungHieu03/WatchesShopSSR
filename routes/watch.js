var express = require('express');
const watchController = require('../controller/watchController');
const upload = require('../middleware/multer');
var router = express.Router();

router.route("/")
  .get(watchController.getAll)
  .post(upload.single("image"), watchController.postWatch)

module.exports = router;