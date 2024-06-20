var express = require('express');
const watchController = require('../controller/watchController');
const authMiddleware = require('../middleware/authMiddleware');
var router = express.Router();

router.route("/dashboard")
  .get(authMiddleware.ensureAuthenticated, authMiddleware.isAdmin, watchController.viewAll);

router.route("/form")
  .get(authMiddleware.ensureAuthenticated, authMiddleware.isAdmin, watchController.indexCreate);

router.route("/search").post(watchController.searchWatch);

router.post("/filter", watchController.filterWatch);

router.get("/edit/:watchId", authMiddleware.ensureAuthenticated, authMiddleware.isAdmin, watchController.indexEdit);



router.route("/")
  .get(watchController.getAll)
  .post(authMiddleware.ensureAuthenticated, watchController.postWatch);


router.route("/:watchId")
  .get(watchController.getWatch)
  .post(authMiddleware.ensureAuthenticated, watchController.updateWatch)
  .delete(authMiddleware.ensureAuthenticated, watchController.deleteWatch);


module.exports = router;