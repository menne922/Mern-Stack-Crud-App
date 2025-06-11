const express = require('express');
const router = express.Router();
const Students = require('../models/students');

// GET all students
router.get(`/`, async (req, res) => {
  try {
    const students = await Students.find({});
    res.send({ students });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

const mongoose = require('mongoose');

router.get(`/:id`, async (req, res) => {
  const { id } = req.params;

  // Validate ID format
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ message: 'Invalid student ID format' });
  }

  try {
    const student = await Students.findById(id);
    if (!student) return res.status(404).send({ message: 'Student not found!' });
    res.send({ student });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// CREATE a student
router.post(`/`, async (req, res) => {
  const parsedDate = new Date(req.body.birthday);
  parsedDate.setUTCHours(12, 0, 0, 0); // Set time to 12:00 UTC (safe fallback)
  try {
    const newStudent = new Students({
      name: req.body.name,
      birthday: parsedDate,
      email: req.body.email,
      enrollnumber: req.body.enrollnumber
    });

    await newStudent.save();
    res.send({ newStudent });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

// UPDATE a student
router.put(`/:id`, async (req, res) => {
  const parsedDate = new Date(req.body.birthday);
  parsedDate.setUTCHours(12, 0, 0, 0);
  try {
    const updatedStudent = await Students.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        birthday: parsedDate, // ensure Date
        email: req.body.email,
        enrollnumber: req.body.enrollnumber
      },
      { new: true, runValidators: true }
    );

    if (!updatedStudent) return res.status(404).send({ message: 'Student not found!' });
    res.send({ message: 'The student was updated', updatedStudent });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

// DELETE a student
router.delete(`/:id`, async (req, res) => {
  try {
    const removedStudent = await Students.findByIdAndDelete(req.params.id);
    if (!removedStudent) return res.status(404).send({ message: 'Student not found!' });
    res.send({ message: 'The student was removed' });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

module.exports = router;