import { normalize } from 'path-browserify'
import React, { useContext } from 'react'
import noteContext from '../context/note/noteContext'

const NoteItems = (props) => {
    const context = useContext(noteContext)
    const { deleteNote, editNote } = context
    const { note, updateNote } = props

    const handleDelete = () => {
        let confirmation = window.confirm("Are you sure you want to delete it? It will be deleted permanently ")
        if(confirmation) {
            deleteNote(note._id)
        }
    }

    const onChangeDoThis = async () => {
        console.log("do this bro")
        // await editNote(note)
    }

//deleteNote(note._id)

    return (
        <>
            <div className="noteitem-custom-card" style={{backgroundColor: note.tag.toLowerCase() === "important" ?"#eb6b34":"#16ac23"}}>
                <div className="title-and-buttons">
                    <b style={{paddingLeft:"1%"}} contentEditable="true" onChange={() => {onChangeDoThis()}}>{note.title}</b>
                    <div className="buttons-delete-and-erase">
                        <i className="fa-solid fa-trash-can mx-2" onClick={() => { handleDelete() }}></i>
                        <i className="fa-solid fa-square-pen mx-2" onClick={() => {
                            updateNote(note)
                        }} ></i>
                    </div>
                </div>
                <div className="content-description" contentEditable="true" onChange={() => {onChangeDoThis()}}>
                    {note.description}
                </div>
                    {/* <p style={{position:"relative", bottom:"15px"}}>{note.tag}</p> */}
            </div>
        </>
    )
}

export default NoteItems