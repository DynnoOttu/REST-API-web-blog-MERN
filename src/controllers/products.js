exports.createProduct = (req, res, next) => {
  const name = req.body.name;
  const price = req.body.price;
  console.log("Request Body", req.body);
  res.json({
    message: "Create data product success!!",
    data: {
      id: 1,
      name: name,
      price: price,
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
