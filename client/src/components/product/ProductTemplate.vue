<template>
  <div class="col-md-4">
    <div class="product">
      <div class="product--container mb-4 shadow-sm">
        <div class="product__header">
          <div class="product__img">
            <router-link
              :to="{ name: 'ProductDetail', params: { id: product._id } }"
            >
              <img
                :src="`data:${image.contentType};base64,${image.data}`"
                alt=""
              />
            </router-link>
          </div>
          <h5>{{ product.name }}</h5>
          <div class="product--btn row">
            <div class="col"></div>
            <strong class="col">{{ toMoneyString(product.price) }}</strong>
            <div
              class="col text-start"
              style="cursor: pointer"
              @click="addToCart(product._id)"
            >
              <i class="fa-solid fa-cart-plus fa-xl"></i>
            </div>
          </div>
        </div>
        <div class="product__container">
          <ul class="text-start">
            <li class="product--description">+ {{ product.chipset }}</li>
            <li class="product--description">+ {{ product.internal }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { useStore } from "vuex";
import { toMoneyString } from "../../utils/utils.js";
export default {
  name: "product-template",
  props: {
    product: {
      type: Object,
      required: true,
    },
    image: {
      type: Object,
    },
  },
  setup() {
    const store = useStore();

    function addToCart(idProduct) {
      console.log("addToCart:", idProduct);
      store.dispatch("cart/addProductToCart", idProduct);
    }
    return { toMoneyString, addToCart };
  },
};
</script>
<style scoped>
.product {
  height: 490px;
  max-height: 700px;
  margin: 0 auto;
  overflow: hidden;
}
.product__img:hover {
  cursor: pointer;
}
/* .product__image {
  max-height: 700px;
  max-width: 127.135px;
  margin: auto;
} */
ul {
  padding-left: 3rem;
}
img {
  /* height: 300px;
  max-width: 250px; */
  max-width: 100%;
  margin: auto;
  object-fit: fill;
  max-height: -webkit-fill-available;
  height: 19em;
}
.product__container--header {
  height: 50px;
  overflow: hidden;
  padding: 0.75em 0.5em;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.product__header {
  /* margin: auto; */
}
.product__img {
  position: relative;
  height: 300px;
  margin: auto;
}
.product__img:hover {
  content: "phukaa";
  margin-right: 4px;
  margin-bottom: 2px;
  margin-top: -1px;
  font-size: 30px;
}
.product--btn {
  display: flex;
  justify-content: center;
}
.product--description {
  font-size: 0.8em;
  overflow: hidden;
  padding: 0.25em;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: left;
}
</style>
