const mongoose = require("mongoose");
const { Schema } = mongoose;

const notesSchema = new Schema({
  userId: { ref: "user", type: mongoose.Schema.Types.ObjectId },
  title: { type: String, required: true, minlength: 5 },
  description: { type: String, minlength: 5 },
  tag: { type: String },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("notes", notesSchema);
