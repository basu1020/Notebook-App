import React,{ useContext } from 'react'
import noteContext from '../context/note/noteContext'

const NoteItems = (props) => {
    const context = useContext(noteContext)
    const { deleteNote } = context
    const { note, updateNote } = props
    
    return (
        <>
            <div className="col-md-3">
                <div className="card my-3">
                    <div className="mx-2 my-2">
                        <div className="d-flex" style={{ justifyContent: "space-between" }}>
                        <div className="d-flex align-items-center">
                            <h5 className="card-title align-item-center">{note.title}</h5>
                        </div>
                        <div className="align-items-center">
                            <i className="fa-solid fa-trash-can mx-2" onClick={()=>{deleteNote(note._id)}}></i>
                            <i className="fa-solid fa-square-pen mx-2" onClick={()=>{
                                updateNote(note)
                            }} ></i>
                        </div>
                        </div>
                        <p className="card-text">{note.description}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NoteItems