import React, { useContext } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import NoteContext from "../context/Notes/NoteContext";

const Note = (props) => {
  const { note, updateNote } = props;
  const noteContext = useContext(NoteContext);
  const { notes, editNote, deleteNote } = noteContext;
  const deleteNoteFromUI = async (noteId) => {
    await deleteNote(note._id, note);
  };

  // const updateNoteFromUI = async () => {
  //   await editNote(note._id, note);
  // };

  return (
    <>
      <div className="col-md-3">
        <div className="card my-3">
          <div className="card-body">
            <div className="d-flex align-items-center">
              <h5 className="card-title">{note.title}</h5>
              <i
                className="far fa-trash-alt mx-2"
                onClick={() => {
                  deleteNoteFromUI(note._id);
                }}
              ></i>
              <i
                className="far fa-edit mx-2"
                onClick={() => {
                  updateNote(note);
                }}
              ></i>
            </div>
            <p className="card-text">{note.description}</p>
          </div>
        </div>
      </div>
    </>
  );
};

Note.propType = {
  title: PropTypes.string.isRequired,
  about: PropTypes.string,
};

Note.defaultProps = {
  title: "title",
  about: "About",
};

export default Note;
