const express = require('express');
const Item = require('../models/Item');
const router = express.Router();

// Example GET endpoint
router.get('/', (req, res) => {
    res.json({ message: 'Items endpoint working' });
});

// GET items with filtering, pagination, sorting
router.get('/items', async (req, res) => {
    const { name, sort = 'name', order = 'asc', page = 1, limit = 10 } = req.query;
    const filter = name ? { name: new RegExp(name, 'i') } : {};
    const items = await Item.find(filter)
        .sort({ [sort]: order === 'asc' ? 1 : -1 })
        .skip((page - 1) * limit)
        .limit(Number(limit));
    res.json(items);
});

// GET single item
router.get('/items/:id', async (req, res) => {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ error: 'Item not found' });
    res.json(item);
});

// POST create item with validation
router.post('/items', async (req, res) => {
    if (!req.body.name || typeof req.body.name !== 'string') {
        return res.status(400).json({ error: 'Name is required and must be a string.' });
    }
    const item = new Item({ name: req.body.name });
    await item.save();
    res.status(201).json(item);
});

// PUT update item with validation
router.put('/items/:id', async (req, res) => {
    if (!req.body.name || typeof req.body.name !== 'string') {
        return res.status(400).json({ error: 'Name is required and must be a string.' });
    }
    const item = await Item.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true });
    if (!item) return res.status(404).json({ error: 'Item not found' });
    res.json(item);
});

// DELETE item
router.delete('/items/:id', async (req, res) => {
    const item = await Item.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ error: 'Item not found' });
    res.json({ message: 'Item deleted' });
});

module.exports = router;
