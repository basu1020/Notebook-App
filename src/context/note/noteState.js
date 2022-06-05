import { useState } from 'react'
import NoteContext from './noteContext'

const NoteState = (props) => {
    const host = 'http://localhost:5000'
    const intitalState = []
    const [note, setNote] = useState(intitalState)
    const [authToken,setauthToken] = useState('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI5YjNiN2UxZTNiZDk1NjBkY2JmY2E2In0sImlhdCI6MTY1NDQwNDcxNn0.afiHxxXhnegTVjqMaVtvGQiAFjdIlrGqrP0VNCJkb2I')

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

    //
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
        for (let index = 0; index < note.length; index++) {
            const element = note[index];
            if(element._id === id){
                element.title = title
                element.description = description
                element.tag = tag
            }
        }
    }

    return (
        <NoteContext.Provider value={{ note, authToken, setauthToken, fetchAllNotes, setNote, addNote, deleteNote, editNote }}> 
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState 
