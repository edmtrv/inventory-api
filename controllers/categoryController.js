exports.getCategories = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: 0,
    data: {
      categories: [],
    },
  });
};

exports.getCateogry = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      category: {},
    },
  });
};

exports.createCategory = (req, res) => {
  res.status(201).json({
    status: 'success',
    data: {
      category: null,
    },
  });
};

exports.updateCateogry = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      category: {},
    },
  });
};

exports.deleteCateogry = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null,
  });
};
