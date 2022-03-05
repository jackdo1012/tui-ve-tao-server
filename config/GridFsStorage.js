const crypto = require("crypto")
const path = require("path")
const multer = require("multer")
const { GridFsStorage } = require("multer-gridfs-storage")

const storage = new GridFsStorage({
    url: process.env.DB_URI,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err)
                }
                const filename =
                    buf.toString("hex") + path.extname(file.originalname)
                const fileInfo = {
                    filename: filename,
                    bucketName: "images",
                }
                resolve(fileInfo)
            })
        })
    },
})

const upload = multer({ storage }).array("images", 10)

module.exports = {
    upload,
}
