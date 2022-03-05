const express = require("express")
const middleware = (app) => {
    app.use(require("cors")())
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use(require("method-override")("_method"))
    app.use(require("./cookie"))
    app.use((_, res, next) => {
        res.removeHeader("X-Powered-By")
        next()
    })
    app.set("view engine", "ejs")
}
module.exports = middleware
