const auth = require('../helpers/auth');
const Product = require('../models/Product');
const Category = require('../models/Category');
const User = require('../models/User');

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json({
      status: 'success',
      results: products.length,
      data: { products },
    });
  } catch (err) {
    res.status(404).json({
      status: 'failure',
      message: err,
    });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    res.status(200).json({
      status: 'success',
      data: { product },
    });
  } catch (err) {
    res.status(404).json({
      status: 'failure',
      message: err,
    });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const userId = await auth(req, res);

    const user = await User.findById(userId);
    const category = await Category.findById(req.body.category);

    const newProduct = await Product.create({
      ...req.body,
      user: user.id,
      category: category.id,
    });

    user.products = user.products.concat(newProduct.id);
    category.products = category.products.concat(newProduct.id);
    await user.save();
    await category.save();

    res.status(201).json({
      status: 'success',
      data: { product: newProduct },
    });
  } catch (err) {
    res.status(404).json({
      status: 'failure',
      message: `some error ${err}`,
    });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    await auth(req, res);
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      data: { product },
    });
  } catch (err) {
    res.status(404).json({
      status: 'failure',
      message: err,
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    await auth(req, res);
    await Product.findByIdAndRemove(req.params.id);

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: 'failure',
      message: err,
    });
  }
};
