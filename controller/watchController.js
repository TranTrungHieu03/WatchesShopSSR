const { Watch, Comment } = require("../model");
const BrandService = require("../services/brandService");
const commentServices = require("../services/commentServices");
const UploadService = require("../services/uploadService");
const watchService = require("../services/watchService");

class WatchController {
    async getAll(req, res) {
        try {
            const watches = await watchService.getAllWatchs();

            return res.status(200).render("layout", {
                body: "index",
                title: "Watch Page",
                watches: watches
            })
        } catch (error) {
            console.error("Error fetching watches:", error);
            return res.status(500).render("error");
        }
    }
    async viewAll(req, res) {
        try {
            const watches = await watchService.getAllWatchs();

            return res.status(200).render("adminLayout", {
                body: "./watch/dashboard",
                title: "Watch Dashboard",
                watches: watches
            })
        } catch (error) {
            console.error("Error fetching watches:", error);
            return res.status(500).render("error");
        }
    }
    async filterWatch(req, res) {
        try {
            let brands = []
            const temp = req.body['brands[]']
            if (temp == undefined) return res.status(403)
            if (!Array.isArray(temp)) {

                brands = [temp]
            } else {

                brands = temp
            }

            const watches = await watchService.getByBrand(brands);

            return res.status(200).json({ watches: watches })


        } catch (error) {
            console.error("Error fetching watches:", error);
            return res.status(500).render("error");
        }
    }
    async getWatch(req, res) {
        try {
            const watch = await watchService.getWatchById(req.params.watchId);
            console.log(watch);

            return res.status(200).render("layout", {
                body: "./watch/index",
                title: "Watch Page",
                watch: watch
            })
        } catch (error) {
            console.error("Error fetching watch:", error);
            return res.status(500).render("error");
        }
    }
    async searchWatch(req, res) {
        try {
            const searchItem = req.body.searchName;
            const watches = await watchService.findByName(searchItem)

            return res.status(200).render("layout", {
                body: "index",
                title: "Watch Page",
                watches: watches
            })
        } catch (error) {
            console.error("Error find watches:", error);
            return res.status(500).render("error");
        }
    }
    async postWatch(req, res) {
        try {
            const { watchName, price, isAutomatic, watchDescription, comments, brand, image } = req.body
           
            
            if (!watchName || !price || !watchDescription || !brand) {
                return res.status(404).render("layout", {
                    body: "./watch/form",
                    message: "Fill all type are required!"
                })
            }
            console.log(watchName, price, isAutomatic, watchDescription, comments, brand, image);

            
            await watchService.createWatch({ watchName, price, isAutomatic, watchDescription, comments, brand, image })
            return res.redirect("/watch")
            
        } catch (error) {
            console.error("Error create watch:", error);
            return res.status(500).render("error");
        } s
    }
    async updateWatch(req, res) {
        try {
            const  watchId = req.params.watchId
            const { watchName, price, watchDescription, comments, brand, isAutomatic } = req.body

            if (!watchName || !price || !watchDescription || !comments || !brand) {
                return res.status(404).render("error")
            }
            const watch = await watchService.getWatch(watchId)

            if (!watch) {
                return res.render("error")
            }
            const data = new Watch(req.body)
            console.log(data);
            
            await watchService.updateWatchById(watchId, data)

            return res.redirect(`/watch/${watchId}`)
        } catch (error) {
            console.error("Error update watch:", error);
            return res.status(500).render("error");
        }
    }

    async deleteWatch(req, res) {
        try {
            const { watchId } = req.params

            await watchService.deleteWatchById(watchId)

            return res.redirect("/home")
        } catch (error) {
            console.error("Error delete watch:", error);
            return res.status(500).render("error");
        }
    }

    async commentWatch(req, res) {

        try {
            const { rating, content, author } = req.body
            const { watchId } = req.params

            const watch = watchService.getWatchById(watchId)

            if (!watch) {
                return res.render("error")
            }


            const isCommentByAuthor = await watchService.isComment(author, watch.comments)
            if (isCommentByAuthor) {
                return res.render("error")
            }

            const commentData = new Comment(rating, content, author)
            const comment = await commentServices.createComment(commentData)
            const updateComments = await watchService.updateComment(comment, watch.comments)
            await watchService.updateWatchById(watch, { comments: updateComments })

            return res.redirect(`watch/${watchId}`)
        } catch (error) {
            console.error("Error comment watch:", error);
            return res.status(500).render("error");
        }
    }

    async indexCreate(req, res) {
        try {
            const brands = await BrandService.getAllBrands();
            return res.status(200).render("adminLayout", {
                body: "./watch/create",
                title: "Watch Page",
                brands: brands
            })
        } catch (error) {
            console.error("Error Form Watch:", error);
            return res.status(500).render("error");
        }

    }

    async indexEdit(req, res) {
        try {
            const { watchId } = req.params
            const watch = await watchService.getWatchById(watchId)

            const brands = await BrandService.getAllBrands();
            console.log(watch);

            return res.status(200).render("adminLayout", {
                body: "./watch/edit",
                title: "Watch Page",
                watch: watch,
                brands: brands
            })
        } catch (error) {
            console.error("Error Form Watch:", error);
            return res.status(500).render("error");
        }

    }
}

module.exports = new WatchController