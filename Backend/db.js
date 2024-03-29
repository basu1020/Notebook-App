require("dotenv").config()
const mongoose = require('mongoose')

const mongoURI = process.env.MONGO_URI

console.log(mongoURI)

const connectToMongo = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
      } catch (error) {
        console.log(error);
        process.exit(1);
      }
}

module.exports = connectToMongo