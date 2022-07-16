import { createStore, createLogger } from "vuex";
import { products } from "./modules/products.js";
import { cart } from "./modules/cart";

const debug = process.env.NODE_ENV !== "production";
export default createStore({
  modules: {
    products,
    cart,
  },
  strict: debug,
  plugins: debug ? [createLogger()] : [],
});
