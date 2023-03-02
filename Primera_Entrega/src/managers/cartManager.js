import fs from "fs";

class CartManager {
  #path;
  constructor(path) {
    this.#path = path;
  }

  async getCarts() {
    try {
      const cart = await fs.promises.readFile(this.#path, "utf-8");
      return JSON.parse(cart);
    } catch (error) {
      return [];
    }
  }

  async getIDs() {
    const carts = await this.getCarts();
    const ids = await carts.map((el) => el.id);
    const mayorID = Math.max(...ids);

    if (mayorID === -Infinity) {
      return 0;
    } else {
      return ++mayorID;
    }
  }

  async addCart() {
    try {
      let newId = await this.getIDs();
      const carts = await this.getCarts();
      const newCart = { id: newId, products: [] };
      const cartsAdd = [...carts, newCart];
      await fs.promises.writeFile(this.#path, JSON.stringify(cartsAdd));
    } catch (error) {
      throw new Error(error);
    }
  }

  async getCartById(id) {
    const carts = await this.getCarts();
    const cartCheck = await carts.find((el) => el.id === id);

    if (!cartCheck) {
      throw new Error("Not Found");
    } else {
      return cartCheck;
    }
  }

  async addProductToCart(idCart, idProduct) {
    const carts = await this.getCarts();
    const cartIndex = await carts.findIndex((el) => {
      el.id === idCart;
    });

    if (cartIndex === -1) {
      throw new Error("Not found");
    }

    const cart = carts[cartIndex];
    const productIndex = cart.products.findIndex((el) => el.id === idProduct);

    if (productIndex === -1) {
      cart.products.push({ id: idProduct, quantity: 1 });
    } else {
      cart.products[productIndex].quantity += 1;
    }

    carts[cartIndex] = cart;

    await fs.promises.writeFile(this.#path, JSON.stringify(carts));
  }
}
export default CartManager;
