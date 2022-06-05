const mongoose = require('mongoose')
const { Schema } = mongoose

const NoteSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId, //This is to link user and his/her notes, so that one user cannot see someone else's notes.
        ref : 'user' //reference schema 
    },
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true,
    },
    tag:{
        type: String,
        default: "General"
    },
    date:{
        type: Date,
        default: Date.now,
        required: true
    },
})

module.exports = mongoose.model("notes",NoteSchema)