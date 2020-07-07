const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A product name is required'],
    unique: true,
    minlength: [2, 'Product name must be longer than 2 characters'],
  },
  description: {
    type: String,
    required: [true, 'A product description is required'],
    minlength: [10, 'A longer description is required'],
  },
  price: { type: Number, required: [true, 'A product price is required'] },
  number_in_stock: { type: Number },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  },
});

productSchema.set('toJSON', {
  transform: (doc, returnedObj) => {
    returnedObj.id = returnedObj._id.toString();
    delete returnedObj._id;
    delete returnedObj.__v;
  },
});

module.exports = mongoose.model('Product', productSchema);
