// app.js
// Express 
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const todoRouter = require('./routes/todos');

// Connect to MongoDB
mongoose.connect('mongodb+srv://Admin:password12321@cluster0.f9cox.mongodb.net/mydatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB:', err));

// Body-parser middleware
app.use(express.json());
app.use(express.static('public'));

// Use the todos router for the '/todos' endpoint
app.use('/todos', todoRouter);

// Define your routes here
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
