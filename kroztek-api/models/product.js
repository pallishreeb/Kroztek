const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "category",
    required: true
  },
  subcategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "subcategory",
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true
  },
  features: [
    {
      name: String,
      value: String
    }
  ],
  images: [],
  youtubeLink: String,
  websiteLink: String,
  documents: [], // Add a field for document
  views: { type: Number, default: 0 } ,
  isActive:{
    type: Boolean,
    default: true
  },
  createdAt:{
    type: Date,
    default: Date.now 
},
});

const Product = mongoose.model('product', productSchema);

module.exports = Product;
