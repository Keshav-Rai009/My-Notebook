import React, { useContext, useEffect, useState } from "react";
import Notes from "./Notes";
import NoteContext from "../context/Notes/NoteContext";

export default function MyNotes() {
  const noteContext = useContext(NoteContext);
  const { addNote } = noteContext;
  const [note, setNote] = useState({ title: "", description: "", tag: "" });

  const addNoteFromUI = async (e) => {
    e.preventDefault();
    await addNote(note);
    setNote({ title: "", description: "", tag: "" });
  };

  const onChange = (event) => {
    setNote({ ...note, [event.target.id]: event.target.value });
  };

  return (
    <div className="container my-4">
      <h1 className="my-5">Add your notes</h1>
      <form className="mb-3 my-3">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            aria-describedby="title"
            onChange={onChange}
            value={note.title}
          />
          <div id="title" className="form-text"></div>
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            onChange={onChange}
            value={note.description}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <input
            type="text"
            className="form-control"
            id="tag"
            aria-describedby="tag"
            onChange={onChange}
            value={note.tag}
          />
          <div id="tag" className="form-text"></div>
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={addNoteFromUI}
        >
          Submit
        </button>
      </form>
      <Notes></Notes>
    </div>
  );
}
