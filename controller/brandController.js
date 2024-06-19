const BrandService = require("../services/brandService");

class BrandController {
    static async getAllBrand(req, res) {
        try {
            const brands = await BrandService.getAllBrands();

            if (brands.length > 0) {

                return res.status(200).json({ brands: brands })
            } else {
                return res.status(200).json({ brands: "not found" })
            }


            // return res.status(200).render("brand/index", { brands })
        } catch (error) {
            console.error("Error fetching brands:", error);
            return res.status(500).render("error");
        }
    }
    static async viewAllBrand(req, res) {
        try {
            const brands = await BrandService.getAllBrands();
            return res.status(200).render("adminLayout", { brands: brands , body: "./brand/dashboard", title: "Brand Dashboard",})

        } catch (error) {
            console.error("Error fetching brands:", error);
            return res.status(500).render("error");
        }
    }
    static async getBrand(req, res) {
        try {
            const { brandId } = req.params;
            const brand = await BrandService.getBrandById(brandId);

            return res.status(200).render("brand/viewOne", { brand })
        } catch (error) {
            console.error("Error fetching brand:", error);
            return res.status(500).render("error");
        }

    }
    static async createBrand(req, res) {
        try {
            const data = req.body;
            const newBrand = await BrandService.createBrand(data);
            return res.status(201).render("brand/viewOne", { brand: newBrand })
        } catch (error) {
            console.error("Error create brand:", error);
            return res.status(500).render("error");
        }
    }

    static async updateBrand(req, res) {
        try {
            const { brandId, data } = req.body;
            const updateBrand = await BrandService.updateBrand(brandId, data.brandName)
            return res.status(201).render("brand/viewOne", { brand: updateBrand })
        } catch (error) {
            console.error("Error update brand:", error);
            return res.status(500).render("error");
        }
    }
    static async deleteBrand(req, res) {
        try {
            const { brandId } = req.params;
            const deleteBrand = await BrandService.deleteBrandById(brandId);
            return res.status(200).render("brand/index", deleteBrand)
        } catch (error) {
            console.error("Error deletef brand:", error);
            return res.status(500).render("error");
        }
    }
}

module.exports = BrandController