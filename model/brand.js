const mongoose = require("mongoose")

const Schema = mongoose.Schema
const brandSchema = new Schema({ brandName: String }, { timestamps: true, });
module.exports = brandSchema

