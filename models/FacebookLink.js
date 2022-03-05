require("./Images")
const mongoose = require("mongoose")
const Schema = mongoose.Schema

const FacebookLinkSchema = new Schema({
    img: { type: mongoose.Types.ObjectId, ref: "Images" },
    link: String,
})

module.exports = mongoose.model(
    "FacebookLinks",
    FacebookLinkSchema,
    "facebook_links"
)
