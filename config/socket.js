const { Server } = require("socket.io")
let io = null

exports.io = () => io
module.exports.init = (httpServer) =>
    (io = new Server(httpServer, { cors: process.env.CORS_ORIGIN }))
