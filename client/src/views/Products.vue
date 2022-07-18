<template>
  <div>
    <h1>PRODUCT</h1>
    <div class="create-product">
      <a href="/products/new">create a new product</a>
    </div>
    <!-- <div v-if="image">
      <img :src="`data:${image.contentType};base64,${image.data}`" alt="" />
    </div> -->
    <div class="products" v-if="isProductExist">
      <div class="row">
        <ProductTemplate
          v-for="(product, index) in products"
          :key="index"
          :product="product"
          :image="images[index]"
          :index="index"
        />
      </div>
    </div>
    <div v-if="!isProductExist">
      <p>loading....</p>
    </div>
  </div>
</template>
<script>
import { computed } from "vue";
//import { mapGetters, mapState } from "vuex";
import { useStore } from "vuex";

import ProductTemplate from "../components/product/ProductTemplate.vue";

export default {
  name: "products-page",
  components: { ProductTemplate },
  setup() {
    const store = useStore();
    const products = computed(() => store.state.products.all);
    const images = computed(() => store.state.products.images);
    const isProductExist = computed(
      () => store.getters["products/isProductExist"]
    );

    return { products, images, isProductExist };
  },
  // computed: {
  //   ...mapState({
  //     products: (state) => state.products.all,
  //     images: (state) => state.products.images,
  //   }),
  //   ...mapGetters("products", ["isProductExist"]),
  // },

  // created() {
  //   this.$store.dispatch("products/getAllProducts");
  // },
};
</script>
<style scoped>
.products {
  margin-top: 40px;
}
</style>
