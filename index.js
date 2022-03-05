require("dotenv").config()
const PORT = process.env.PORT || 5000
const appInit = require("./config/express")
const { init } = require("./config/socket")
const middleware = require("./middleware")
const routes = require("./routes")

const main = async () => {
    // App init
    const { app, httpServer } = await appInit()

    // Socket.io
    io = init(httpServer)

    // Middleware

    middleware(app)

    // Routes

    routes(app)

    httpServer.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`)
    })
}

main()
