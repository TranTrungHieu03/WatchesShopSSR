const cloudinary = require("../config/cloudinary")
const fs = require("fs")
class UploadService {
    async uploadSingle(filePath) {
        try {
            console.log(filePath);

            const result = await cloudinary.uploader.upload(filePath, {
                upload_preset: "zutpw4nl",
                public_id: `unique_id_${Date.now()}`,
            })

            fs.unlinkSync(filePath)

            return result.secure_url
        }
        catch (error) {
            throw new Error("Error upload image", error)
        }
    }
}

module.exports = new UploadService