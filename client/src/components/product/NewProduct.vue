<template>
  <form action="" name="newProduct" @submit.prevent="handleSubmit">
    <div class="el-input">
      <label for="name">Name</label>
      <input type="text" v-model="form.name" name="name" />
    </div>
    <div class="el-input">
      <label for="technology">technology</label>
      <input type="text" v-model="form.technology" name="technology" />
    </div>
    <div class="el-input">
      <label for="announced">announced</label>
      <input type="text" v-model="form.announced" name="announced" />
    </div>
    <div class="el-input">
      <label for="dimensions">dimensions</label>
      <input type="text" v-model="form.dimensions" name="dimensions" />
    </div>
    <div class="el-input">
      <label for="wight">wight</label>
      <input type="text" v-model="form.wight" name="wight" />
    </div>
    <div class="el-input">
      <label for="sim">sim</label>
      <input type="text" v-model="form.sim" name="sim" />
    </div>
    <div class="el-input">
      <label for="size">size</label>
      <input type="text" v-model="form.size" name="size" />
    </div>
    <div class="el-input">
      <label for="resolution">resolution</label>
      <input type="text" v-model="form.resolution" name="resolution" />
    </div>
    <div class="el-input">
      <label for="os">os</label>
      <input type="text" v-model="form.os" name="os" />
    </div>
    <div class="el-input">
      <label for="chipset">chipset</label>
      <input type="text" v-model="form.chipset" name="chipset" />
    </div>
    <div class="el-input">
      <label for="cpu">cpu</label>
      <input type="text" v-model="form.cpu" name="cpu" />
    </div>
    <div class="el-input">
      <label for="gpu">gpu</label>
      <input type="text" v-model="form.gpu" name="gpu" />
    </div>
    <div class="el-input">
      <label for="internal">internal</label>
      <input type="text" v-model="form.internal" name="internal" />
    </div>
    <div class="el-input">
      <label for="usb">usb</label>
      <input type="text" v-model="form.usb" name="usb" />
    </div>
    <div class="el-input">
      <label for="price">price</label>
      <input type="text" v-model="form.price" name="price" />
    </div>
    <div class="el-input">
      <label for="images">images</label>
      <input type="file" ref="file" name="images" multiple />
    </div>
    <div><button>sumbit</button></div>
  </form>
</template>
<script>
import $ from "../../../node_modules/jquery/dist/jquery.min.js";
import axios from "axios";
import url from "../../api/index.js";

//import { ref } from "vue";

export default {
  name: "new-product",
  setup() {},
  data() {
    return {
      form: {
        name: "",
        technology: "",
        announced: "",
        dimensions: "",
        wight: "",
        sim: "",
        size: "",
        resolution: "",
        os: "",
        chipset: "",
        cpu: "",
        gpu: "",
        internal: "",
        usb: "",
        price: "",
        images: [],
      },
    };
  },
  methods: {
    handleSubmit() {
      const formSubmit = $('form[name="newProduct"]')[0];
      for (var i = 0; i < this.$refs.file.files.length; i++) {
        let file = this.$refs.file.files[i];
        this.form.images.push(file);
        //console.log(file);
      }
      const data = {
        name: this.form.name,
        technology: this.form.technology,
        announced: this.form.announced,
        dimensions: this.form.dimensions,
        wight: this.form.wight,
        sim: this.form.sim,
        size: this.form.size,
        resolution: this.form.resolution,
        os: this.form.os,
        chipset: this.form.chipset,
        cpu: this.form.cpu,
        gpu: this.form.gpu,
        internal: this.form.internal,
        usb: this.form.usb,
        price: this.form.price,
        images: this.form.images,
      };

      console.log(data);
      const formData = new FormData(formSubmit);
      //formData.append("images", this.form.images);
      //formData.append("data", JSON.stringify(data));
      axios
        .post(url.products, formData, {
          // headers: { "Content-Type": "application/json" },
          headers: { "Content-Type": "multipart/form-data" },
          // headers: {
          //   Accept: "application/json",
          //   "Content-Type": "multipart/form-data",
          // },
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log("ERROR call handleSubmit:", error);
        });
    },
  },
  created() {},
};
</script>
