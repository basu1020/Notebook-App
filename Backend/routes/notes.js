const express = require('express')
const router = express.Router()
const fetchuser = require('../middleware/fetchuser')
const Notes = require('../models/Notes')
const { body, validationResult } = require('express-validator')
const { db } = require('../models/Notes')

//ROUTER 1 : getting user's notes : Login required.(auth-token needed)
router.get('/fetchAllNotes', fetchuser, async (req, res) => {
    const notes = await Notes.find({ user: req.user.id })
    res.json({ notes })
})

//ROUTER 2 : Adding a new note : Login required (auth-token needed)
router.post('/addNote', fetchuser, [
    body('title', 'title should not be empty').exists(),
    body('description', 'description should not be empty').exists(),
], async (req, res) => {
    try {
        //Checking for whether there are any errors in validation.       
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        //creating a document into notes database.
        notes = await Notes.create({
            user: req.user.id,
            title: req.body.title,
            description: req.body.description,
            tag: req.body.tag
        })

        res.json({ notes })

    } catch (error) {
        console.error(error)
        res.status(400).json({error: error.array()})
    }
})

//ROUTE 3 : to delte a note of the user : Login required (auth-token required)
router.delete('/deleteNote/:id', fetchuser, [
], async (req, res) => {
    try {
        let note = await Notes.findById(req.params.id)
        if(!note){return res.status(404).send("Not Found")}

        if(note.user.toString() !== req.user.id){
            return res.status(404).send("Not Allowed")
        }
        note = await Notes.findByIdAndDelete(req.params.id)
        res.json({"success":"note has been deleted"})
    } catch (error) {
        console.error(error)
        res.status(400).send("Internal server error")
    }
})

//ROUTER 4 : to update an existing note of the user : Login required (auth-token required)
router.put('/updateNote/:id', fetchuser, [
    body('id','please give suitable ID').exists(),
],async(req, res)=> {
    try {
        const { title, description, tag } = req.body
        const newNote = {}
        if(title){newNote.title = title}
        if(description){newNote.description = description}
        if(tag){newNote.tag = tag}

        let note = await Notes.findById(req.params.id)
        if(!note){return res.status(404).send("Not Found")}

        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not Allowed")
        }

        note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true})
        res.json({note})

    } catch (error) {
        console.log(error)
    }
})

module.exports = router