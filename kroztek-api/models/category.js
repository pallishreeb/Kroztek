const mongoose = require('mongoose')
const { Schema } = mongoose

const categorySchema = new Schema({
    categoryName:{
        type: String
    },
    rank:{
        type: Number
    },
    isActive:{
        type: Boolean,
        default: true
    },
    createdAt:{
        type: Date,
        default: Date.now 
    }
})

module.exports = mongoose.model('category', categorySchema)