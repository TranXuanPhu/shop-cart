import url from "../../api/product.js";
import axios from "axios";

//state
const state = {
  all: [],
  images: [],
};

//getters - get,computed data form state
const getters = {
  // getAllProducts(state) {
  //   return state.all;
  // },
  isProductExist(state) {
    return Array.isArray(state.all) && state.all.length;
  },
};

//actions -  call api, get data from url
//được gọi bằng cách từ vue component: this.$store.dispatch
// trả về giá trị gọi commit cho mutations
const actions = {
  async getAllProducts({ commit }) {
    try {
      const response = await axios.get(url.products);
      commit("setProducts", {
        products: response.data.products,
        images: response.data.images,
      });
    } catch (error) {
      console.error("getAllProducts", error);
    }
  },
};

//mutations
// thường gán dữ liệu cho state
const mutations = {
  setProducts(state, { products, images }) {
    state.all = products;
    state.images = images;
  },
};
export const products = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
