const auth = require('../helpers/auth');
const Category = require('../models/Category');
const User = require('../models/User');

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find().populate('products');

    res.status(200).json({
      status: 'success',
      results: categories.length,
      data: { categories },
    });
  } catch (err) {
    res.status(404).json({
      status: 'failure',
      message: err,
    });
  }
};

exports.getCateogry = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id).populate(
      'products'
    );

    res.status(200).json({
      status: 'success',
      data: { category },
    });
  } catch (err) {
    res.status(404).json({
      status: 'failure',
      message: err,
    });
  }
};

exports.createCategory = async (req, res) => {
  try {
    await auth(req, res);
    const user = await User.findById(req.body.user);
    const newCategory = await Category.create({ ...req.body, user: user.id });

    user.categories = user.categories.concat(newCategory.id);
    await user.save();

    res.status(201).json({
      status: 'success',
      data: { category: newCategory },
    });
  } catch (err) {
    res.status(404).json({
      status: 'failure',
      message: err,
    });
  }
};

exports.updateCateogry = async (req, res) => {
  try {
    await auth(req.res);
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      data: { category },
    });
  } catch (err) {
    res.status(404).json({
      status: 'failure',
      message: err,
    });
  }
};

exports.deleteCateogry = async (req, res) => {
  try {
    await auth(req, res);
    await Category.findByIdAndRemove(req.params.id);

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
