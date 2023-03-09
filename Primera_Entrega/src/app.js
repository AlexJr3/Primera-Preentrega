//IMPORTS
import express from "express";
import ProductManager from "./managers/productManager.js";
import productsRouter from "./routes/products.router.js";
import CartManager from "./managers/cartManager.js";
import cartsRouter from "./routes/carts.router.js";

//VARIABLES
const app = express();
const manager = new ProductManager("./src/jsons/products/Products.json");
const cartManager = new CartManager("./src/jsons/carts/Carts.json");
//MIDDLEWARES
app.use("/api/products/", productsRouter);
app.use("/api/carts/", cartsRouter);

app.listen(8080, () => {
  console.log("Server listening in port 8080");
});

export { manager, cartManager };
