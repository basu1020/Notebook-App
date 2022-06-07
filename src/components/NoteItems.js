import React, { useContext } from 'react'
import noteContext from '../context/note/noteContext'

const NoteItems = (props) => {
    const context = useContext(noteContext)
    const { deleteNote } = context
    const { note, updateNote } = props

    const handleDelete = () => {
        let confirmation = window.confirm("Are you sure you want to delete it? It will be deleted permanently ")
        if(confirmation === true){
            deleteNote(note._id)
        }
    }

//deleteNote(note._id)

    return (
        <>
            <div className="noteitem-custom-card">
                <div className="title-and-buttons">
                    <b>{note.title}</b>
                    <div className="buttons-delete-and-erase">
                        <i className="fa-solid fa-trash-can mx-2" onClick={() => { handleDelete() }}></i>
                        <i className="fa-solid fa-square-pen mx-2" onClick={() => {
                            updateNote(note)
                        }} ></i>
                    </div>
                </div>
                <div className="content-description">
                    <p>{note.description}</p>
                </div>
            </div>
        </>
    )
}

export default NoteItems