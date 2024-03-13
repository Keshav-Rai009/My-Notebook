const express = require("express");
const Notes = require("../models/Notes");
const fetchUser = require("../middleware/fetchuser");
const router = express.Router();
const { body, validationResult } = require("express-validator");

// ROUTE 1: Get All the Notes using: GET "/api/notes/fetchnotes". Login required
router.get("/getAllNotes", fetchUser, async (req, res) => {
  try {
    // fetchUser will set user - {user : id}
    console.log(req.user.id);
    const notes = await Notes.find({ userId: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// ROUTE 1: Add note using: post "/api/notes/note". Login required

router.post(
  "/note",
  fetchUser,
  [
    body("title", "Enter a valid title").isLength({ min: 5 }),
    body("description", "Description must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      const errors = validationResult.req;
      if (errors) {
        return res.status(400).json({ errors: errors?.array() });
      }

      const note = await Notes.create({
        title,
        description,
        tag,
        userId: req.user.id,
      });
      res.send(note);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

// ROUTE 3: Update an existing Notes using: PUT "/api/notes/updatenote". Login required
router.put("/updatenote/:id", fetchUser, async (req, res) => {
  const { title, description, tag } = req.body;
  try {
    // Create a newNote object
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    // Find the note to be updated and update it
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }

    // if (note.user.toString() !== req.user.id) {
    //   return res.status(401).send("Not Allowed");
    // }

    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// ROUTE 4: Delete an existing Notes using: DELETE "/api/notes/deletenote". Login required
router.delete("/deletenote/:id", fetchUser, async (req, res) => {
  try {
    // Find the note to be delete and delete it
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }

    // Allow deletion only if user owns this Notes
    // if (note.user.toString() !== req.user.id) {
    //   return res.status(401).send("Not Allowed");
    // }

    note = await Notes.findByIdAndDelete(req.params.id);
    res.json({ Success: "Notes has been deleted", note: note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

debounce = (callback, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback.apply(this, args);
    }, delay);
  };
};
module.exports = router;

module.exports = router;
