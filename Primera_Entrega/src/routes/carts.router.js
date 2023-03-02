//IMPORTS
import { json, Router } from "express";
import { cartManager, manager } from "../app.js";

//VARIABLES
const cartsRouter = Router();

//MIDDLEWARES
cartsRouter.use(json());

cartsRouter.get("/:cid", async (req, res) => {
  try {
    const cid = Number(req.params.cid);
    const carts = await cartManager.getCartById(cid);
    res.status(200).send(carts);
  } catch (error) {
    res.status(404).send({ error });
  }
});

cartsRouter
