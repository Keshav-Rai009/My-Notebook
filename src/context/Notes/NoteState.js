import React, { useState } from "react";
import NoteContext from "./NoteContext";
const HOST = "http://localhost:5000";
const AUTH_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVlOTU1MTRiMjljOTgxNDJjNzAyNzkyIn0sImlhdCI6MTcwOTc5MDQ5M30.wT3zeTrdP2GqQSoDGLSTmEFXq6PnRFHVDXY3lLk5z8Q";
const NoteState = (props) => {
  const [notes, setNotes] = useState([]);

  const getNotes = async () => {
    try {
      const response = await fetch(`${HOST}/api/notes/getAllNotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": AUTH_TOKEN,
          "Access-Control-Allow-Headers": true,
          "Access-Control-Allow-Methods": "POST",
        },
      });
      const notes = await response.json();
      setNotes(notes);
    } catch (error) {
      alert("Failed to get notes" + error);
    }
  };

  const addNote = async ({ title, description, tag }) => {
    try {
      const response = await fetch(`${HOST}/api/notes/note`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": AUTH_TOKEN,
          "Access-Control-Allow-Headers": true,
        },
        body: JSON.stringify({ title, description, tag: tag || "personal" }),
      });
      const note = await response.json();
      setNotes(notes.concat(note));
    } catch (error) {
      alert("Failed to add note" + error);
    }
  };

  const editNote = async (noteId, { title, description, tag }) => {
    console.log(noteId, { title, description, tag });
    try {
      const response = await fetch(`${HOST}/api/notes/updatenote/${noteId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": AUTH_TOKEN,
          "Access-Control-Allow-Headers": true,
        },
        body: JSON.stringify({ title, description, tag }),
      });
      console.log(response);
      await getNotes();
    } catch (error) {
      alert("Failed to edit note" + error);
    }
  };

  const deleteNote = async (noteId) => {
    try {
      const response = await fetch(`${HOST}/api/notes/deletenote/${noteId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": AUTH_TOKEN,
          "Access-Control-Allow-Headers": true,
        },
        // body: JSON.stringify({ title, description, tag: "personal" }),
      });
      notes.splice(
        notes.findIndex((note) => note._id === noteId),
        1
      );
      await getNotes();
    } catch (error) {
      alert("Failed to add note" + error);
    }
  };

  return (
    <NoteContext.Provider
      value={{ notes, getNotes, addNote, editNote, deleteNote }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
