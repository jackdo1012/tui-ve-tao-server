const mongoose = require("mongoose")
const { upload } = require("../config/GridFsStorage")
const FacebookLinkModel = require("../models/FacebookLink")

let gfs

mongoose.connection.on("open", () => {
    gfs = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
        bucketName: "images",
    })
})

class ImagesController {
    index(req, res) {
        gfs.find().toArray((err, files) => {
            if (!files || files.length === 0) {
                return res.json({ error: "File not found" })
            }
            res.json(files)
        })
    }
    async all(req, res) {
        const links = await FacebookLinkModel.find({}).populate("img")
        res.json(links)
    }
    uploadImg(req, res) {
        if (!req.auth) {
            return res.render("fail", { error: "Wrong password" })
        }
        upload(req, res, async (err) => {
            if (err) {
                res.render("fail", { error: "Error submitting file." })
            } else {
                if (!req.files || req.files.length === 0) {
                    res.render("fail", { error: "No file chosen." })
                } else {
                    let link = req.body.link
                    if (!link.includes("http")) {
                        link = "http://" + link
                    }
                    let fbLink
                    for (let i = 0; i < req.files.length; i++) {
                        fbLink = new FacebookLinkModel({
                            img: req.files[i].id,
                            link,
                        })
                        await fbLink.save()
                    }
                    require("../config/socket").io().emit("newImg", true)
                    res.render("success")
                }
            }
        })
    }
    filename(req, res) {
        gfs.find({ filename: req.params.filename }).toArray((err, files) => {
            if (!files || files.length === 0) {
                return res.json({ error: "File not found" })
            }
            gfs.openDownloadStreamByName(req.params.filename).pipe(res)
        })
    }
    async delete(req, res) {
        if (!req.auth) {
            return res.render("fail", { error: "Wrong password" })
        }
        await FacebookLinkModel.findOneAndDelete({
            img: req.params.id,
        })
        gfs.delete(new mongoose.Types.ObjectId(req.params.id), (err, data) => {
            if (err) return res.render("fail", { error: err })
            require("../config/socket").io().emit("newImg", true)
            res.render("success")
        })
    }
}

module.exports = new ImagesController()
