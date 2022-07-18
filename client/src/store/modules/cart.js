const items = JSON.parse(localStorage.getItem("cart"));
//state
const state = {
  items: items || [],
};

//getters
const getters = {
  cartProducts(state, getters, rootState) {
    return state.items.map(({ _id, quantity }) => {
      const product = rootState.products.all.find((product) => {
        return product._id === _id;
      });
      return product
        ? {
            _id: product._id,
            name: product.name,
            price: product.price,
            quantity,
          }
        : undefined;
    });
  },
  getImage(state, getters, rootState) {
    return (_idProduct) => {
      const indexImg = rootState.products.all.findIndex(
        (product) => product._id === _idProduct
      );
      return rootState.products.images.at(indexImg);
    };
  },
  getTotalPrice(state, getters) {
    return getters.cartProducts.reduce((total, product) => {
      return total + (product ? product.price * product.quantity : 0);
    }, 0);
  },
  getTotalCountProducts(state, getters) {
    return getters.cartProducts.reduce((totalCount, product) => {
      return totalCount + (product ? product.quantity : 0);
    }, 0);
  },
};

//actions
const actions = {
  addProductToCart({ state, commit }, _id) {
    const cartItem = state.items.find((item) => item._id === _id);
    console.log(cartItem);
    if (!cartItem) commit("pushProductToCart", _id);
    else commit("incrementItemQuantity", cartItem);
  },
  decrementProductQuantity({ state, commit }, _id) {
    const cartItem = state.items.find((item) => item._id === _id);
    if (cartItem) {
      if (cartItem.quantity > 0) {
        if (cartItem.quantity === 1) commit("deleteProduct", cartItem);
        else commit("decrementItemQuantity", cartItem);
      }
    }
  },
  setCartProducts({ commit }, items) {
    commit("setCartItems", { items });
  },
  deleteProductInCart({ state, commit }, _id) {
    const cartItem = state.items.find((item) => item._id === _id);
    if (cartItem) commit("deleteProduct", cartItem);
  },
};

//mutations
const mutations = {
  pushProductToCart(state, _id) {
    state.items.push({ _id: _id, quantity: 1 });
    localStorage.setItem("cart", JSON.stringify(state.items));
  },
  incrementItemQuantity(state, { _id }) {
    const cartItem = state.items.find((item) => item._id == _id);
    if (cartItem) cartItem.quantity++;
    localStorage.setItem("cart", JSON.stringify(state.items));
  },
  decrementItemQuantity(state, { _id }) {
    const cartItem = state.items.find((item) => item._id == _id);
    if (cartItem) {
      if (cartItem.quantity > 0) cartItem.quantity--;
    }
    localStorage.setItem("cart", JSON.stringify(state.items));
  },
  setCartItems(state, { items }) {
    console.log("mutations::setCartItems", items);
    state.items = items;
  },
  deleteProduct(state, item) {
    const index = state.items.indexOf(item);
    console.log("mutations::deleteProduct", index, state.items);
    if (index >= 0) state.items.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(state.items));
  },
};

export const cart = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
