const express = require('express');
const Product = require('../models/Product');
const router = express.Router();

// GET products with filtering, pagination, sorting
router.get('/', async (req, res) => {
    const { name, minPrice, maxPrice, sort = 'name', order = 'asc', page = 1, limit = 10 } = req.query;
    const filter = {};
    if (name) filter.name = new RegExp(name, 'i');
    if (minPrice) filter.price = { ...filter.price, $gte: Number(minPrice) };
    if (maxPrice) filter.price = { ...filter.price, $lte: Number(maxPrice) };
    const products = await Product.find(filter)
        .sort({ [sort]: order === 'asc' ? 1 : -1 })
        .skip((page - 1) * limit)
        .limit(Number(limit));
    res.json(products);
});

// GET single product
router.get('/:id', async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
});

// POST create product with validation
router.post('/', async (req, res) => {
    const { name, price } = req.body;
    if (!name || typeof name !== 'string' || typeof price !== 'number') {
        return res.status(400).json({ error: 'Name (string) and price (number) are required.' });
    }
    const product = new Product({ name, price });
    await product.save();
    res.status(201).json(product);
});

// PUT update product with validation
router.put('/:id', async (req, res) => {
    const { name, price } = req.body;
    if (!name && price === undefined) {
        return res.status(400).json({ error: 'Name or price required.' });
    }
    const update = {};
    if (name) update.name = name;
    if (price !== undefined) update.price = price;
    const product = await Product.findByIdAndUpdate(req.params.id, update, { new: true });
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
});

// DELETE product
router.delete('/:id', async (req, res) => {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json({ message: 'Product deleted' });
});

module.exports = router;
