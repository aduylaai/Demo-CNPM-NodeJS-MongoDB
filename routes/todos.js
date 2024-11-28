const express = require('express');
const router = express.Router();
const Todo = require('../model/todo'); // Đảm bảo import đúng tên mô hình Todo

// Define route to create a new todo
router.post('/', async (req, res) => {
    try {
        const todo = new Todo({
            title: req.body.title,
            completed: false // Sử dụng 'completed' thay vì 'complete'
        });
        await todo.save();
        res.status(201).json(todo);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all todos
router.get('/', async (req, res) => {
    try {
        const todos = await Todo.find();
        console.log(todos); // Kiểm tra dữ liệu
        res.json(todos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update a todo
router.patch('/:id', async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id); // Sửa res.param.id thành req.params.id
        if (!todo) return res.status(404).json({ message: 'Todo not found!' });

        todo.completed = req.body.completed; // Cập nhật trạng thái 'completed'
        await todo.save();

        res.json(todo);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a todo
router.delete('/:id', async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id); // Đảm bảo sử dụng req.params.id
        if (!todo) return res.status(404).json({ message: 'Todo not found!' });

        // Thay todo.remove() bằng Todo.findByIdAndDelete()
        await Todo.findByIdAndDelete(req.params.id);  
        res.json({ message: 'Todo deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// routes/todos.js

// Cập nhật todo
router.put('/:id', async (req, res) => {
    try {
        // Tìm todo theo ID
        const todo = await Todo.findById(req.params.id);
        if (!todo) return res.status(404).json({ message: 'Todo not found!' });

        // Cập nhật các thuộc tính của todo
        todo.title = req.body.title || todo.title;  // Cập nhật title nếu có
        todo.completed = req.body.completed || todo.completed;  // Cập nhật completed nếu có

        // Lưu lại todo đã được cập nhật
        await todo.save();

        res.json(todo);  // Trả về todo đã cập nhật
    } catch (error) {
        res.status(400).json({ message: error.message });  // Lỗi khi cập nhật
    }
});


module.exports = router;
