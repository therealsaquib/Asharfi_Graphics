const express = require('express');
const User = require('../models/User');
const router = express.Router();

// GET all users
router.get('/', async (req, res) => {
    const users = await User.find({}, 'username');
    res.json(users);
});

// GET single user
router.get('/:id', async (req, res) => {
    const user = await User.findById(req.params.id, 'username');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
});

// POST create user with validation
router.post('/', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required.' });
    }
    try {
        const user = new User({ username, password });
        await user.save();
        res.status(201).json({ id: user._id, username: user.username });
    } catch (err) {
        res.status(400).json({ error: 'Username already exists.' });
    }
});

// PUT update user
router.put('/:id', async (req, res) => {
    const { username, password } = req.body;
    if (!username && !password) {
        return res.status(400).json({ error: 'Username or password required.' });
    }
    const update = {};
    if (username) update.username = username;
    if (password) update.password = password;
    const user = await User.findByIdAndUpdate(req.params.id, update, { new: true });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ id: user._id, username: user.username });
});

// DELETE user
router.delete('/:id', async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ message: 'User deleted' });
});

module.exports = router;
