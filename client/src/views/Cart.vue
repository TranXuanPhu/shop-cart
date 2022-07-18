<template>
  <section id="cart-template">
    <div class="container">
      <div class="row d-fex">
        <div class="col-xs-12 col-lg-9 col-md-8 col-sm-7 mg-bottom-15">
          <div class="cart-title">
            <h2>Giỏ hàng:</h2>
            <span class="cart-count">
              <span class="cart-counter">{{ totalCount }}</span>
              <span class="cart-item-title"> Sản phẩm</span>
            </span>
          </div>

          <div
            class="item-wrap"
            id="cart-page-result"
            v-for="(item, index) in cartProducts"
            :key="index"
          >
            <CartTemplate :item="item" :image="getImages(item?._id)" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import CartTemplate from "../components/cart/CartTemlate.vue";
export default {
  name: "cart-page",
  components: { CartTemplate },
  setup() {
    const store = useStore();
    const totalPrice = computed(() => store.getters["cart/getTotalPrice"]);
    const totalCount = computed(
      () => store.getters["cart/getTotalCountProducts"]
    );
    const cartProducts = computed(() => store.getters["cart/cartProducts"]);
    const images = computed(() => store.getters["products/getImages"]);
    function getImages(idProduct) {
      return store.getters["cart/getImage"](idProduct);
    }
    //store.dispatch("products/getAllProducts");

    return { totalPrice, totalCount, cartProducts, images, getImages };
  },
};
</script>
<style scoped>
.cart-title {
  padding-top: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
}
</style>
