require("dotenv").config()
const mongoose = require('mongoose')

const mongoURI = process.env.MONGO_URI

console.log(mongoURI)

const connectToMongo = async () => {
    await mongoose.connect(mongoURI, () => {
        console.log("connected to mongo successfully")
    })
}

module.exports = connectToMongo