const { Schema, model } = require('mongoose')
const mongoose = require('mongoose')

const stockSchema = new Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    amount: {
        type: String,
        required: true
    },
},

{
    timestamps: true,
})

module.exports = model('Stock', stockSchema)