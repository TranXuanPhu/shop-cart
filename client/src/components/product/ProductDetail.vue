<template>
  <div class="row" v-if="!isLoading">
    <div class="col-7">
      <SplideBasic
        :images="images"
        :nameProduct="`${product.name}`"
      ></SplideBasic>
    </div>
    <div class="col-5">
      <div class="box_saving">
        <div class="bs_content">
          <div class="pr-item text">
            <p>
              <span class="note">(*)</span> Giá hoặc khuyến mãi không áp dụng
              trả góp lãi suất đặc biệt (0%, 0.5%, 1%)
            </p>
          </div>
          <div class="bs_rule">
            <ul>
              <li>Chỉ áp dụng giao tận nơi.</li>
              <li>Thời gian nhận hàng: 1 ngày sau khi đặt</li>
              <li>Không áp dụng chung với khuyến mãi khác.</li>
              <li>Mỗi khách hàng (1 SĐT) chỉ được mua 1 sản phẩm</li>
              <li>Áp dụng góp Online qua thẻ tín dụng</li>
              <li>Bắt buộc khui hộp và kích hoạt khi nhận máy</li>
              <li>Không áp dụng góp nhà tài chính</li>
              <li>Số lượng có hạn, áp dụng tùy tỉnh thành</li>
              <li>Hư gì đổi nấy trong 15 ngày nếu lỗi do nhà sản xuất</li>
            </ul>
          </div>
          <div class="block-button saving">
            <span @click="buyNow(product._id)" class="btn-buynow one red jsBuy">
              MUA NGAY GIÁ {{ toMoneyString(product.price) }}
            </span>
            <span @click="addCart(product._id)" class="btn-addcart">
              Thêm vào giỏi hàng
              <i class="fa-solid fa-cart-plus fa-xl"></i>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { useRoute } from "vue-router";
import axios from "axios";
import { ref } from "vue";
import url from "../../api/index.js";
import SplideBasic from "./splide/SplideBasic.vue";
import { toMoneyString } from "../../utils/utils.js";
export default {
  name: "product-detail",
  components: { SplideBasic },
  setup() {
    //data
    const product = ref({});
    const images = ref([]);
    const isLoading = ref(true);

    const route = useRoute();
    console.log("useRoute:", route.params.id);

    function buyNow(idProduct) {
      console.log("buyNow:", idProduct);
    }
    function addCart(idProduct) {
      console.log("addcart:", idProduct);
    }
    async function getProductDetails() {
      try {
        const response = await axios.get(`${url.products}/${route.params.id}`);
        product.value = response.data.product;
        images.value = response.data.images;
        isLoading.value = false;
        console.log(product.value);
      } catch (error) {
        console.error(error);
      }
    }

    //create
    getProductDetails();
    return {
      product,
      images,
      isLoading,
      getProductDetails,
      toMoneyString,
      buyNow,
      addCart,
    };
  },
};
</script>
<style scoped>
.box_saving {
  padding-top: 2.8rem;
}
.box_saving .bs_content {
  background-color: #fff4de;
  border: 1px solid #fde8d5;
  padding: 10px 0;
}
.box_saving .bs_content .pr-item.text {
  margin-top: 0;
  border-top: none !important;
  border-bottom: 1px dashed #e0e0e0 !important;
  padding: 0 10px 10px;
  margin-bottom: 10px;
}
.box_saving .bs_rule {
  padding: 0 7px;
  margin-bottom: 10px;
}
.box_saving .block-button {
  padding: 0 10px;
  margin-top: 10px;
}
.block-button {
  margin-bottom: 10px;
  position: relative;
  overflow: hidden;
}
.block-button .btn-buynow.one {
  height: 46px;
  line-height: 35px;
}
.block-button .btn-buynow {
  margin-bottom: 8px;
  display: block;
  padding-left: 0;
  padding-right: 0;
  cursor: pointer;
}
.btn-buynow.red {
  background-color: #d0021c;
  font-weight: bold;
  padding: 6px 10px;
}
.btn-buynow {
  border-radius: 4px;
  color: #fff;
  display: block;
  font-size: 15px;
  padding: 14px 10px;
  text-align: center;
}
.btn-addcart {
  cursor: pointer;
  height: 46px;
  margin-right: 0;
  display: block;
  width: 100%;
  background-color: #2f80ed;
  border-radius: 4px;
  color: #fff;
  font-size: 13px;
  line-height: 16px;
  padding: 14px 10px;
  text-align: center;
}
</style>
