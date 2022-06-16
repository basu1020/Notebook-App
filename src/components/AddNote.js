import React, { useContext, useState } from 'react'
import noteContext from '../context/note/noteContext'

const AddNote = () => {
  const context = useContext(noteContext)
  const { addNote } = context
  const [note, setNote] = useState({ title: "", description: "", tag: "" })

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }

  const handleClick = (e) => {
    e.preventDefault()
    addNote(note.title, note.description,note.tag)
    setNote({ title: "", description: "", tag: "" })                   
  }

  return (
    <>
      <h2 className='my-3'>Add a note</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" className="form-control" id="title" value={note.title} name="title" onChange={onChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea type="text" className="form-control" name="description" id="description" value={note.description} onChange={onChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">Tag</label>
          <input type="text"  className="form-control" name="tag" id="tag" value={note.tag} onChange={onChange} />
        </div>
        <button type="submit" className="btn btn-dark" onClick={handleClick} disabled={note.title.length < 5 || note.description.length < 5}>Add Note</button>
      </form>
    </>
  )
}

export default AddNote