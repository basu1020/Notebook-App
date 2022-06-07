import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/note/noteContext'
import NoteItems from './NoteItems'
import AddNote from './AddNote'

const Note = () => {
  const context = useContext(noteContext)
  const { note, fetchAllNotes, editNote } = context
  const [notes, setNotes] = useState({ title: "", description: "", tag: "" })
  const ref = useRef(null)

  useEffect(() => {
    fetchAllNotes()
    // eslint-disable-next-line
  }, [])


  const updateNote = async (currentNote) => {
    await ref.current.click()
    setNotes(currentNote)
    console.log(notes)
  }

  const handleClick = async () => {
    const id = notes._id
    const etitle = document.getElementById('etitle').value
    const edescription = document.getElementById('edescription').value
    const etag = document.getElementById('etag').value
    if (etitle && edescription) {
      await editNote(id, etitle, edescription, etag)
      fetchAllNotes()
    }
    else {
      alert("Title and Description can't be empty")
    }
  }

  const onChange = (e) => {
    setNotes({ ...notes, [e.target.name]: e.target.value })
  }

  return (
    <>
      <AddNote />
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
                  <input type="text" className="form-control" value={note.title} id="etitle" name="etitle" onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">Description</label>
                  <input type="text" className="form-control" name="edescription" id="edescription" value={note.description} onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">Tag</label>
                  <input type="text" className="form-control" name="etag" id="etag" value={note.tag} onChange={onChange} />
                </div>
              </form>

            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={handleClick}>Update Note</button>
            </div>
          </div>
        </div>
      </div>

      {/* Notes are here */}
      <h2 className='my-3'>Your notes</h2>
      <div className="container-custom">
        <div className="content-cutom">
          {note.map((note) => {
            return <NoteItems key={note._id} updateNote={updateNote} note={note} />
          })}
        </div>
      </div>
    </>
  )
}

export default Note

// we used javascript spread operator in line 33. 