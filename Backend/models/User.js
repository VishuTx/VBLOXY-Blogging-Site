const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // hashed with SHA-256
  salt: { type: String, required: true },
  profileImage: { type: String } // path to uploaded file in /uploads
});

module.exports = mongoose.model('User', UserSchema);