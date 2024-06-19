const { Watch, Comment, Brand } = require("../model")
const mongoose = require('mongoose');
class WatchService {
    async getAllWatchs() {
        try {
            const watches = await Watch.find({}).populate("brand")

            return watches
        } catch (error) {
            throw new Error("Error fetching watches", error)
        }
    }
    async getWatchById(watchId) {
        try {
            const watch = await Watch.findById(watchId).populate("brand")
            return watch
        } catch (error) {
            throw new Error("Error fetching watch", error)
        }
    }
    async createWatch(watch) {
        try {

            const newWatch = new Watch(watch)

            await newWatch.save()

            return newWatch
        } catch (error) {
            throw new Error("Error create watch", error)
        }
    }

    async updateWatchById(watchId, data) {
        try {
            const updateWatch = await Watch.findByIdAndUpdate(watchId, data);
            return updateWatch
        } catch (error) {
            throw new Error("Error update watch", error)
        }
    }

    async deleteWatchById(WatchId) {
        try {
            const deletedWatch = await Watch.deleteOne({ _id: WatchId });
            return deletedWatch
        } catch (error) {
            throw new Error("Error delete watch", error)
        }
    }

    async findByName(name) {
        try {
            const watches = await Watch.find({
                watchName: {
                    $regex: name,
                    $options: "i"
                }
            }).populate("brand")
            return watches
        } catch (error) {
            throw new Error("Error find watch", error)
        }
    }
    async updateAutoMatic(id) {
        try {
            return await Watch.findByIdAndUpdate(id, { isAutomatic: true })
        } catch (error) {
            throw new Error("Error update watch", error)
        }
    }

    async updateComment(newComment, comments) {
        try {
            const validComment = new Comment(newComment)
            return comments.push(validComment)
        } catch (error) {
            throw new Error("Error comment watch", error)
        }
    }

    async isComment(author, comments) {
        try {
            const isExist = comments.find((cmt) => cmt.author = author)
            return isExist
        } catch (error) {
            throw new Error("Error comment watch", error)
        }
    }
    async getByBrand(brands) {
        try {
            const mongoose = require('mongoose');
            const ObjectId = mongoose.Types.ObjectId;
            const brandList = brands.map((brand) => new ObjectId(brand))
            const watches = await Watch.find({ brand: { $in: brandList } }).populate("brand")

            return watches;
        } catch (error) {
            console.error("Error filter watch:", error);
            throw new Error("Error filter watch");
        }
    }


}

module.exports = new WatchService