const mongoose = require("mongoose")
var passportLocalMongoose = require('passport-local-mongoose'); 

const Schema = mongoose.Schema

const memberSchema = new Schema({
    membername: { type: String, require: true },
    password: { type: String, require: true },
    isAdmin: { type: Boolean, default: false },
    YOB: { type: Number, require: true },
    name: { type: String, require: true }
}, { timestamps: true, });

memberSchema.plugin(passportLocalMongoose)
module.exports = memberSchema
