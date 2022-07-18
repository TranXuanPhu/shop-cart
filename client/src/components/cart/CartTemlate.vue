<template>
  <div class="cart-wrap" v-if="image && item">
    <div class="item-info">
      <div class="item-img" @click="gotoProductDetails">
        <img :src="`data:${image.contentType};base64,${image.data}`" alt="" />
      </div>
      <div class="item-title">
        <span style="cursor: pointer" @click="gotoProductDetails">
          {{ item.name }}</span
        >
        <span class="item-option"
          ><span>{{ toMoneyString(item.price) }}</span>
        </span>
      </div>
    </div>
    <div class="item-quantity">
      <div class="quantity-area-cartmini">
        <input
          type="button"
          value="–"
          class="qty-btn btn-left-quantity"
          :style="{ cursor: item.quantity < 2 ? 'default' : 'pointer' }"
          @click="decrementQuantity"
        />
        <input
          type="text"
          id="quantity_cart"
          name="quantity"
          :value="`${item.quantity}`"
          min="1"
          class="quantity-mini"
        />
        <input
          type="button"
          value="+"
          class="qty-btn btn-right-quantity"
          @click="incrementQuantity"
        />
      </div>
      <div class="item-remove">
        <span class="remove-wrap">
          <span @click="deleteItemCart()">Xóa</span>
        </span>
      </div>
    </div>
    <div class="item-price">
      {{ toMoneyString(item.price * item.quantity) }}
    </div>
  </div>
</template>
<script>
import { toMoneyString } from "../../utils/utils.js";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
export default {
  name: "cart-template",
  props: {
    item: Object,
    image: Object,
  },
  setup(props) {
    const router = useRouter();
    const store = useStore();

    function gotoProductDetails() {
      router.push({
        name: "ProductDetail",
        params: { id: props.item._id },
      });
    }

    function deleteItemCart() {
      store.dispatch("cart/deleteProductInCart", props.item._id);
    }
    function incrementQuantity() {
      console.log("incrementQuantity");
      store.dispatch("cart/addProductToCart", props.item._id);
    }
    function decrementQuantity() {
      console.log("incrementQuantity");
      if (props.item.quantity > 1)
        store.dispatch("cart/decrementProductQuantity", props.item._id);
    }

    return {
      toMoneyString,
      gotoProductDetails,
      deleteItemCart,
      incrementQuantity,
      decrementQuantity,
    };
  },
};
</script>
<style scoped>
.cart-wrap {
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  padding: 15px 0;
  border-bottom: 1px solid #eee;
}
.item-title {
  margin-left: 15px;
}
.item-option {
  display: block;
  margin-top: 5px;
  text-align: left;
}
.item-info {
  width: 60%;
  display: flex;
}
.item-img {
  max-width: 100px;
  cursor: pointer;
}
img {
  max-width: 100%;
  vertical-align: middle;
  cursor: pointer;
}
.item-remove span {
  text-decoration: underline;
  font-weight: bold;
}
.item-remove {
  cursor: pointer;
}

.quantity-area-cartmini {
  float: left;
  width: 100px;
  display: flex;
}
.quantity-area-cartmini .qty-btn {
  background: #fff;
  float: left;
  border: 1px solid #e1e1e1;
  cursor: pointer;
  font-weight: 600;
  outline: none;
  height: 33px;
  width: 33px;
  text-align: center;
  border-radius: 0;
  font-size: 20px;
  color: black;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: unset;
}
.quantity-area-cartmini .quantity-mini {
  background: #fff;
  font-weight: 600;
  height: 33px;
  text-align: center;
  width: 33px;
  border: 1px solid #e1e1e1;
  border-left: none;
  border-right: none;
  border-radius: 0;
  float: left;
  -webkit-appearance: none;
  font-size: 15px;
  color: black;
  padding: 0;
}
.quantity-area-cartmini .qty-btn {
  background: #fff;
  float: left;
  border: 1px solid #e1e1e1;
  cursor: pointer;
  font-weight: 600;
  outline: none;
  height: 33px;
  width: 33px;
  text-align: center;
  border-radius: 0;
  font-size: 20px;
  color: black;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: unset;
}
</style>
