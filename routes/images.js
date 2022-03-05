const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const ImagesController = require("../controllers/ImagesController")

let gfs

mongoose.connection.on("open", () => {
    gfs = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
        bucketName: "images",
    })
})

router.post("/upload", ImagesController.uploadImg)

router.get("/all", ImagesController.all)

router.get("/", ImagesController.index)

router.get("/:filename", ImagesController.filename)

router.delete("/delete/:id", ImagesController.delete)

module.exports = router
