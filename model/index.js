const brandSchema = require("./brand");
const commentSchema = require("./comment");
const memberSchema = require("./member");
const watchSchema = require("./watch");
const mongoose = require("mongoose");


const Member = mongoose.model("Member", memberSchema);
const Brand = mongoose.model("Brand", brandSchema)
const Watch = mongoose.model("Watch", watchSchema)
const Comment = mongoose.model("Comment", commentSchema)

module.exports = { Member, Brand, Watch, Comment }