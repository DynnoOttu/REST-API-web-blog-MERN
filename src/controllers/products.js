exports.createProduct = (req, res, next) => {
  res.json({
    message: "Create data product success",
    data: {
      id: 1,
      name: "biskuit",
      price: 5000,
    },
  });
  next();
};

exports.getAllProducts = (req, res, next) => {
  res.json({
    message: "Get all data product success",
    data: [
      {
        id: 1,
        name: "biskuit",
        price: 5000,
      },
    ],
  });
};
