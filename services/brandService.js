const { Brand } = require("../model")

class BrandService {
    static async getAllBrands() {
        try {
            const brands = await Brand.find({})
            return brands
        } catch (error) {
            throw new Error("Error fetching brands", error)
        }
    }
    static async getBrandById(brandId) {
        try {
            const brands = await Brand.findById(brandId)
            return brands
        } catch (error) {
            throw new Error("Error fetching brands", error)
        }
    }
    static async createBrand(brand) {
        try {
            const newBrand = new Brand(brand)
            await newBrand.save()
            return newBrand
        } catch (error) {
            throw new Error("Error create brand", error)
        }
    }

    static async updateBrandById(brandId, data) {
        try {
            const updateBrand = await Brand.findByIdAndUpdate(brandId, data);
            return updateBrand
        } catch (error) {
            throw new Error("Error update brand", error)
        }
    }

    static async deleteBrandById(brandId) {
        try {
            const deletedBrand = await Brand.deleteOne({ _id: brandId });
            return deletedBrand
        } catch (error) {
            throw new Error("Error delete brand", error)
        }
    }
}

module.exports = BrandService