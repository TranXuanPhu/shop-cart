import { createStore, createLogger } from "vuex";
import { products } from "./modules/products.js";
import { cart } from "./modules/cart.js";
import { user } from "./modules/user.js";

const debug = process.env.NODE_ENV !== "production";
export default createStore({
  modules: {
    products,
    cart,
    user,
  },
  strict: debug,
  plugins: debug ? [createLogger()] : [],
});
