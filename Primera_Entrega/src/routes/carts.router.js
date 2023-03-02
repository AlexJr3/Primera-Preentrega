//IMPORTS
import { json, Router } from "express";
import { cartManager, manager } from "../app.js";

//VARIABLES
const cartsRouter = Router();

//MIDDLEWARES
cartsRouter.use(json());

cartsRouter.post("/", async (req, res) => {
  try {
    await cartManager.addCart();
    res.status(200).send("Cart created");
  } catch (error) {
    res.status(404).send({ error });
  }
});

cartsRouter.get("/:cid", async (req, res) => {
  try {
    const cid = Number(req.params.cid);
    const carts = await cartManager.getCartById(cid);
    res.status(200).send(carts);
  } catch (error) {
    res.status(404).send({ error });
  }
});

cartsRouter.post("/:cid/product/:pid", async (req, res) => {
  try {
    const cid = Number(req.params.cid);
    const pid = Number(req.params.pid);
    const product = await manager.getProductById(pid);
    await cartManager.addProductToCart(cid, product.id);

    res.status(200).send(await cartManager.getCartById(cid));
  } catch (error) {
    res.status(404).send({ error });
  }
});

export default cartsRouter;
