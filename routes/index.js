const FacebookLinkModel = require("../models/FacebookLink")
const imagesRoutes = require("./images")

function routes(app) {
    app.get("/", async (req, res) => {
        if (!req.auth) {
            return res.render("index", { files: undefined })
        }
        const links = await FacebookLinkModel.find({}).populate("img")
        res.render("index", { files: links })
    })
    app.use("/image", imagesRoutes)
}
module.exports = routes
