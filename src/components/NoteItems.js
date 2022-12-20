import React, { useContext } from 'react'
import noteContext from '../context/note/noteContext'

const NoteItems = (props) => {
    const context = useContext(noteContext)
    const { deleteNote, editNote } = context
    const { note, updateNote } = props

    const handleDelete = () => {
        let confirmation = window.confirm("Are you sure you want to delete it? It will be deleted permanently ")
        if (confirmation) {
            deleteNote(note._id)
        }
    }

    const onChangeDoThis = (e) => {
        // console.log(e.target.value)
        console.log(note)
        console.log(e.target.value)
    }

    return (
        <>
            <div className="noteitem-custom-card" style={{ backgroundColor: note.tag.toLowerCase() === "important" ? "#eb6b34" : "#16ac23" }}>
                <div className="title-and-buttons">
                    <div style={{ paddingLeft: "1%", fontWeight:"600" }} contentEditable="true"  onChange={onChangeDoThis}>{note.title}</div>
                    <div className="buttons-delete-and-erase">
                        <i className="fa-solid fa-trash-can mx-2" onClick={() => { handleDelete() }}></i>
                        <i className="fa-solid fa-square-pen mx-2" onClick={() => { updateNote(note) }}></i>
                    </div>
                </div>
                <div className="content-description" value={note.description} contentEditable="true" onChange={onChangeDoThis}>
                    {note.description}
                </div>
            </div>
        </>
    )
}

export default NoteItems