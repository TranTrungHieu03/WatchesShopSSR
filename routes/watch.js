var express = require('express');
const watchController = require('../controller/watchController');
const upload = require('../middleware/multer');
var router = express.Router();

router.route("/dashboard")
  .get(watchController.viewAll);

router.route("/form")
  .get(watchController.indexCreate);

router.route("/search")
  .post(watchController.searchWatch);

router.get("/edit/:watchId", watchController.indexEdit);

router.post("/filter", watchController.filterWatch);

router.route("/")
  .get(watchController.getAll)
  .post(watchController.postWatch);

router.route("/:watchId")
  .get(watchController.getWatch)
  .post(watchController.updateWatch)
  .delete(watchController.deleteWatch);


module.exports = router;