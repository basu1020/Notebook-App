import { useState } from 'react'
import NoteContext from './noteContext'

const NoteState = (props) => {
    const host = 'http://localhost:5000'
    const intitalState = []
    const [note, setNote] = useState(intitalState)
    const [authToken,setauthToken] = useState(null)

    const fetchAllNotes =  async ()=>{
        
        //TODO API CALL
        const response = await fetch(`${host}/api/notes/fetchAllNotes`,{
            method: 'GET',
            headers: {
                'Content-Type':'application/json',
                'auth-token': authToken
            },
        })
        const json = await response.json()
        setNote(json.notes)
    }

    // Add a Note

    const addNote =  async ( title, description, tag)=>{
        //TODO API CALL
        const response = await fetch(`${host}/api/notes/addNote`,{
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
                'auth-token': authToken
            },
            body: JSON.stringify({title, description, tag})  
        })
        const json = await response.json()
        setNote(note.concat(json.notes))
    }

    const deleteNote = async (id)=>{
        const response = await fetch(`${host}/api/notes/deleteNote/${id}`,{
            method: 'DELETE',
            headers: {
                'Content-Type':'application/json',
                'auth-token': authToken
            },
        })
        const json = response.json()
        console.log(json)

        console.log(`deleting note with id - ${id}`)
        const newNote = note.filter((note)=>{ return note._id !== id})
        setNote(newNote)
    }

    //
    const editNote = async (id,title,description,tag) => {

        // API Call
        const response = await fetch(`${host}/api/notes/updateNote/${id}`,{
            method: 'PUT',
            headers: {
                'Content-Type':'application/json',
                'auth-token': authToken
            },
            body: JSON.stringify({title,description,tag})
        })
        const json =  response.json()
        console.log(json)

        // Logic to show changes to client.
        let newNote = JSON.parse(JSON.stringify(note))
        for (let index = 0; index < newNote.length; index++) {
            const element = newNote[index];
            if(element._id === id){
                newNote[index].title = title
                newNote[index].description = description
                newNote[index].tag = tag
                break
            }
        }
        setNote(newNote)
    }

    return (
        <NoteContext.Provider value={{ note, authToken, setauthToken, fetchAllNotes, setNote, addNote, deleteNote, editNote }}> 
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState 
