import { useState } from 'react'
import NoteContext from './noteContext'

const NoteState = (props) => {
    const host = 'https://dull-tan-sockeye.cyclic.app'
    const intitalState = []
    const [note, setNote] = useState(intitalState)

    const fetchAllNotes = async () => {     //TODO API CALL
        const response = await fetch(`${host}/api/notes/fetchAllNotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem("token")
            },
        })
        const json = await response.json()
        setNote(json.notes)
    }

    // Add a Note
    const addNote = async (title, description, tag) => {  //TODO API CALL
        const Tag = tag ? tag : null
        const response = await fetch(`${host}/api/notes/addNote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': `${localStorage.getItem("token")}`
            },
            body: JSON.stringify({ title, description, Tag })
        })
        const json = await response.json()
        setNote(note.concat(json.notes))
    }

    const deleteNote = async (id) => {
        const response = await fetch(`${host}/api/notes/deleteNote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem("token")
            },
        })
        const json = response.json()

        const newNote = note.filter((note) => { return note._id !== id })
        setNote(newNote)
    }

    const editNote = async (id, title, description, tag) => {  // API Call
        const response = await fetch(`${host}/api/notes/updateNote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem("token")
            },
            body: JSON.stringify({ title, description, tag })
        })
        const json = response.json()
        
        // Logic to show changes to client.
        let newNote = JSON.parse(JSON.stringify(note))
        for (let index = 0; index < newNote.length; index++) {
            const element = newNote[index];
            if (element._id === id) {
                newNote[index].title = title
                newNote[index].description = description
                newNote[index].tag = tag
                break
            }
        }
        setNote(newNote)
    }

    return (
        <NoteContext.Provider value={{ note, fetchAllNotes, setNote, addNote, deleteNote, editNote }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState 
