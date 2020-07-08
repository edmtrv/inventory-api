const bcrypt = require('bcrypt');
const User = require('../models/User');

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().populate('categories', 'products');

    res.status(200).json({
      status: 'success',
      results: users.length,
      data: { users },
    });
  } catch (err) {
    res.status(404).json({
      status: 'failure',
      message: err,
    });
  }
};

exports.createUser = async (req, res) => {
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(req.body.password, saltRounds);

  try {
    const newUser = await User.create({
      username: req.body.username,
      passwordHash,
    });

    res.status(201).json({
      status: 'success',
      data: { user: newUser },
    });
  } catch (err) {
    res.status(404).json({
      status: 'failure',
      message: err,
    });
  }
};
