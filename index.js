const express = require("express");
const app = express();

const productRoutes = require("./src/routes/products");

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-type, Authorization");
});

app.use("/v1/customer", productRoutes);

app.listen(4000);
