const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const app = express();

// Enable CORS with specific options
app.use(cors({
  origin: 'http://localhost:3000', // Updated to match the frontend's origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
}));

app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/exam-management', {})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(`MongoDB connection error: ${err}`));

// Define Student schema and model
const studentSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const Student = mongoose.model('Student', studentSchema);

// Define Faculty schema and model
const facultySchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const Faculty = mongoose.model('Faculty', facultySchema);

// POST route for student registration
app.post('/student-register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if the student already exists
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({ error: 'Student already registered' });
    }

    const newStudent = new Student({ username, email, password });
    await newStudent.save();
    res.status(201).json({ message: 'Student registered successfully' });
  } catch (error) {
    console.error('Error registering student:', error);
    res.status(500).json({ error: 'Error registering student. Please try again later.' });
  }
});

// POST route for faculty registration
app.post('/faculty-register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if the faculty already exists
    const existingFaculty = await Faculty.findOne({ email });
    if (existingFaculty) {
      return res.status(400).json({ error: 'Faculty already registered' });
    }

    const newFaculty = new Faculty({ username, email, password });
    await newFaculty.save();
    res.status(201).json({ message: 'Faculty registered successfully' });
  } catch (error) {
    console.error('Error registering faculty:', error);
    res.status(500).json({ error: 'Error registering faculty. Please try again later.' });
  }
});


// Add this below the existing Faculty model definition in server.js

// Define Assignment schema and model
const assignmentSchema = new mongoose.Schema({
    question: { type: String, required: true },
    deadline: { type: Date, required: true },
  });
  
const Assignment = mongoose.model('Assignment', assignmentSchema);
  
  // POST route for creating an assignment
  app.post('/create-assignment', async (req, res) => {
    try {
      const { question, deadline } = req.body;
  
      // Create a new assignment
      const newAssignment = new Assignment({ question, deadline });
  
      // Save to the database
      await newAssignment.save();
  
      res.status(201).json({ message: 'Assignment created successfully' });
    } catch (error) {
      console.error('Error creating assignment:', error);
      res.status(500).json({ error: 'Error creating assignment. Please try again later.' });
    }
  });

  // Below the existing POST route for creating an assignment

// GET route to fetch all assignments
app.get('/assignments', async (req, res) => {
    try {
      const assignments = await Assignment.find({});
      res.status(200).json(assignments);
    } catch (error) {
      console.error('Error fetching assignments:', error);
      res.status(500).json({ error: 'Error fetching assignments. Please try again later.' });
    }
  });
  
// PUT route to update an assignment by ID
app.put('/assignments/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { question, deadline } = req.body;
  
      // Validate inputs
      if (!id || !question || !deadline) {
        return res.status(400).json({ error: 'Missing required fields' });
      }
  
      // Find the assignment by ID and update it
      const updatedAssignment = await Assignment.findByIdAndUpdate(
        id,
        { question, deadline },
        { new: true }
      );
  
      if (!updatedAssignment) {
        return res.status(404).json({ error: 'Assignment not found' });
      }
  
      res.status(200).json({ message: 'Assignment updated successfully', assignment: updatedAssignment });
    } catch (error) {
      console.error('Error updating assignment:', error);
      res.status(500).json({ error: 'Error updating assignment. Please try again later.' });
    }
  });
  
  
  // DELETE route to delete an assignment by ID
  app.delete('/assignments/:id', async (req, res) => {
    try {
      const { id } = req.params;
  
      // Find the assignment by ID and delete it
      const deletedAssignment = await Assignment.findByIdAndDelete(id);
  
      if (!deletedAssignment) {
        return res.status(404).json({ error: 'Assignment not found' });
      }
  
      res.status(200).json({ message: 'Assignment deleted successfully' });
    } catch (error) {
      console.error('Error deleting assignment:', error);
      res.status(500).json({ error: 'Error deleting assignment. Please try again later.' });
    }
  });
  
  

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, '../../build')));

// Handle any requests that don't match the API routes, send back the React index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../build', 'index.html'));
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
