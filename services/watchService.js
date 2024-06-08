const { Watch } = require("../model")

class WatchService {
    async getAllWatchs() {
        try {
            const watches = await Watch.find({})
            console.log(watches);
            
            return watches
        } catch (error) {
            throw new Error("Error fetching watches", error)
        }
    }
    async getWatchById(watchId) {
        try {
            const watches = await Watch.findById(watchId)
            return watches
        } catch (error) {
            throw new Error("Error fetching watches", error)
        }
    }
    async createWatch(watch) {
        try {
            const newWatch = new Watch(watch)
            return await newWatch.save()
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
}

module.exports = new WatchService