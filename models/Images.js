const mongoose = require("mongoose")
const Schema = mongoose.Schema

const ImageSchema = new mongoose.Schema(
    {
        length: { type: Number },
        chunkSize: { type: Number },
        uploadDate: { type: Date },
        filename: { type: String, trim: true, searchable: true },
        md5: { type: String, trim: true, searchable: true },
    },
    { collection: "images.files", id: false }
)

module.exports = mongoose.model("Images", ImageSchema)
