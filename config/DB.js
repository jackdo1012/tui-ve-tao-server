const mongoose = require("mongoose")
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URI)

        console.log("Connected to DB")
        return new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
            bucketName: "images",
        })
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    connectDB,
}
