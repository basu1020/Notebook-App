import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import noteContext from '../context/note/noteContext'
import NoteItems from './NoteItems'
import AddNote from './AddNote'

const Note = () => {
  const note_Context = useContext(noteContext)
  const { note, fetchAllNotes, editNote } = note_Context
  const [notes, setNotes] = useState({ id: "", title: "", description: "", tag: "" })
  const [addNote, setaddNote] = useState(false)
  const ref = useRef(null)
  const closeRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem("token")) {
      fetchAllNotes()
    }
    else {
      navigate("/")
    }
    // eslint-disable-next-line
  }, [])


  const updateNote = async (currentNote) => {
    await ref.current.click()
    setNotes(currentNote)
  }

  const handleClick = async () => {
    await editNote(notes._id, notes.title, notes.description, notes.tag)
    closeRef.current.click()
  }

  const onChange = (e) => {
    setNotes({ ...notes, [e.target.name]: e.target.value })
  }

  const handleAddNote = () => {
    const addNoteRevealer = document.getElementById('addNote-revealer')
    if (addNoteRevealer.classList.contains("fa-file-circle-plus")) {
      addNoteRevealer.classList.remove("fa-file-circle-plus")
      addNoteRevealer.classList.add("fa-circle-arrow-up")
      setTimeout(() => { setaddNote(true) }, 100)
    }

    else if (addNoteRevealer.classList.contains("fa-circle-arrow-up")) {
      addNoteRevealer.classList.remove("fa-circle-arrow-up")
      addNoteRevealer.classList.add("fa-file-circle-plus")
      setTimeout(() => { setaddNote(false) }, 100)
    }
  }

  return (
    <>
      {addNote && <AddNote />}
      {/* <!-- Button trigger modal --> */}
      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      {/* <!-- Modal --> */}
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Notes</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">

              {/* form */}

              <form>
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">Title</label>
                  <input type="text" className="form-control" value={notes.title} id="etitle" name="title" onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">Description</label>
                  <textarea type="text" className="form-control" name="description" id="edescription" value={notes.description} onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">Tag</label>
                  <input type="text" className="form-control" name="tag" id="etag" value={notes.tag} onChange={onChange} />
                </div>
              </form>

            </div>
            <div className="modal-footer">
              <button type="button" ref={closeRef} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={handleClick} disabled={notes.title.length < 5 || notes.description.length < 5}>Update Note</button>
            </div>
          </div>
        </div>
      </div>

      {/* Notes are here */}
      <div className="container-custom">
        <h2 className='my-3' style={{ display: "flex", justifyContent: "space-between" }}>
          Notes
          <i className="fa-solid fa-file-circle-plus" id="addNote-revealer" onClick={handleAddNote}></i>
        </h2>
        <div className="content-custom">
          {note.map((note) => {
            return <NoteItems key={note._id} id={note._id} updateNote={updateNote} note={note} />
          })}
        </div>
      </div>
    </>
  )
}

export default Note

// we used javascript spread operator in line 33. 