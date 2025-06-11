const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 33,
    trim: true
  },
  birthday: {
    type: Date,
    required: true
    // `trim` is not needed for Date types
  },
  email: {
    type: String,
    required: true,
    trim: true,
    match: /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/ // basic email regex
  },
  enrollnumber: {
    type: Number,
    required: true,
    min: 1,
    max: 120
  }
});

module.exports = mongoose.model('Student', studentSchema);