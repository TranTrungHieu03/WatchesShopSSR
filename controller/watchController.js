const UploadService = require("../services/uploadService");
const watchService = require("../services/watchService");

class WatchController {
    async getAll(req, res) {
        try {
            const watches = await watchService.getAllWatchs();
            console.log(watches);

            return res.status(200).render("layout", {
                body: "index",
                watches: watches
            })
        } catch (error) {
            console.error("Error fetching watches:", error);
            return res.status(500).render("error");
        }
    }
    async postWatch(req, res) {
        try {
            const { watchName, price, isAutomatic, watchDescription, comments, brand } = req.body
            console.log(req.body);
            if (!isAutomatic) { isAutomatic = false }
            if (!watchName || !price || !watchDescription || !comments || !brand) {
                return res.status(404).render("layout", {
                    body: "form",
                    message: "Fill all type are required!"
                })
            }

            const filePath = req.file ? req.file.path : "";
            const urlImage = await UploadService.uploadSingle(filePath)

            const watch = await watchService.createWatch({ watchName, price, isAutomatic, watchDescription, comments, brand, image: urlImage })
            return res.status(200).render("layout", {
                body: "index",
                watch
            })
        } catch (error) {
            console.error("Error create watch:", error);
            return res.status(500).render("error");
        }
    }
}

module.exports = new WatchController