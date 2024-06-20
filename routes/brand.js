
var express = require('express');
const BrandController = require('../controller/brandController');
var router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

router.get("/form", authMiddleware.ensureAuthenticated, authMiddleware.isAdmin, BrandController.indexCreate)

router.route("/")
    .get(BrandController.getAllBrand)
    .post(authMiddleware.ensureAuthenticated, authMiddleware.isAdmin, BrandController.createBrand)
router.route("/dashboard")
    .get(authMiddleware.ensureAuthenticated, authMiddleware.isAdmin, BrandController.viewAllBrand)

router.route("/:brandId")
    .get(BrandController.getBrand)
    .post(authMiddleware.ensureAuthenticated, authMiddleware.isAdmin, BrandController.updateBrand)
    .delete(authMiddleware.ensureAuthenticated, authMiddleware.isAdmin, BrandController.deleteBrand)
router.get("/edit/:brandId", BrandController.indexEdit)


module.exports = router;