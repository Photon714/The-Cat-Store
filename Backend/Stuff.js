let express = require("express");
let app = express();
let { products } = require("./Data");
/* 
NOw whenever products are required and called using url we'll need the products 
*/
app.get("/products", (req, res) => {
  const newProducts = products.map((product) => {
    const { id, name, price } = product;
    return { id, name, price };
  });
  res.json(newProducts);
});

/*
For Particular choice of product  
*/

app.get("/products/:productID", (req, res) => {
  const productID = req.params;
  const singleProduct = products.find((product) => product.id == productID);
  if (!singleProduct) {
    return res.status(404).send("Product Does not exists");
  }
  return res.json(singleProduct);
});

/* 
Here :productID is a route parameter
5:51 : Searches which uses query Strings 
*/

/* 
To use a function in multiple responses use app.use(variablename)
now app.get will have access to variablename
*/
