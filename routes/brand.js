
var express = require('express');
const BrandController = require('../controller/brandController');
var router = express.Router();


router.route("/")
    .get(BrandController.getAllBrand)
    .post(BrandController.createBrand)
router.route("/dashboard")
    .get(BrandController.viewAllBrand)

router.route("/:brandId")
    .get(BrandController.getBrand)
    .put(BrandController.updateBrand)
    .delete(BrandController.deleteBrand)



module.exports = router;