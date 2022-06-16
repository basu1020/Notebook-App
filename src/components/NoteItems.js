import React, { useContext } from 'react'
import noteContext from '../context/note/noteContext'

const NoteItems = (props) => {
    const context = useContext(noteContext)
    const { deleteNote } = context
    const { note, updateNote } = props

    const handleDelete = () => {
        let confirmation = window.confirm("Are you sure you want to delete it? It will be deleted permanently ")
        if(confirmation){
            deleteNote(note._id)
        }
    }

//deleteNote(note._id)

    return (
        <>
            <div className="noteitem-custom-card" style={{backgroundColor: note.tag.toLowerCase() === "important" ?"#eb6b34":"#16ac23"}}>
                <div className="title-and-buttons">
                    <b style={{paddingLeft:"1%"}}>{note.title}</b>
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
                    {/* <p style={{position:"relative", bottom:"15px"}}>{note.tag}</p> */}
            </div>
        </>
    )
}

export default NoteItems