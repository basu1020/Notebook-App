const mongoose = require('mongoose')
const { Schema } = mongoose

const UserSchema = new Schema({  //description of the data.
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now,
    },
})

const User = mongoose.model('user',UserSchema)
User.createIndexes()
module.exports = User //model of UserSchema description named user.

// A Mongoose schema defines the structure of the document, default values, validators, etc.,

// Models: It connect with database and we use in controllers. (Intermediary between database and controllers)
// Controllers: It does our logic for each endpoint. (Intermediary between Models and Routes)
// Routes: It has a call route method (example: GET /api/users) and the controller to execute when it is call (Intermediary between controllers and Frontend)

