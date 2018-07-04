const express = require('express');
const router = express.Router();

// Item Model
const Item = require('../../models/Item');

// @route   GET api/items
// @desc    Get All Items
// @access  Public
router.get('/', (req, res) => {
    Item.find()
        .sort({ start: -1 })
        .then(items => res.json(items));
});

// @route   POST api/items
// @desc    Create An Item
// @access  Public
router.post('/', (req, res) => {
    const newItem = new Item(req.body);

    newItem.save().then(item => res.json(item)).catch(err => console.log(err));
});

// @route   DELETE api/items/:id
// @desc    Delete A Item
// @access  Public
router.delete('/:id', (req, res) => {
    Item.findById(req.params.id)
        .then(item => item.remove().then(() => res.json({ success: true })))
        .catch(err => res.status(404).json({ success: false }));
});

// @route   PUT api/items/:id
// @desc    Put A Item
// @access  Public
router.put('/:id', (req, res) => {
    console.log('/*/*', req.body);
    Item.findById(req.params.id)
        .then(findedItem => {
            findedItem.set(req.body);
            findedItem.save().then(updatedTodo => {
                res.json(updatedTodo)
            })
        })
});

// @route   PATCH api/items/:id
// @desc    Patch A Item
// @access  Public
router.patch('/:id', (req, res) => {
    Item.findById(req.params.id)
        .then(findedItem => {
            findedItem.completed = !findedItem.completed;
            findedItem.save().then(updatedTodo => {
                res.json(updatedTodo)
            })
        })
});


module.exports = router;
