const mongoose = require("mongoose");
const dotenv = require("dotenv")


dotenv.config()

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_HOST, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log("connection successfully ");
        })
    } catch (error) {
        console.error("Connect to DB error")
        process.exit(1)
    }
}

module.exports = connectDB