const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const ItemSchema = new Schema({

    title: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    importance: {
        type: String,
        required: false
    },
    members: {
        type: String,
        required: false
    },
    start: {
        type: Date,
        default: Date.now
    },
    end: {
        type: Date,
        default: Date.now
    }
});

module.exports = Item = mongoose.model('Item', ItemSchema);