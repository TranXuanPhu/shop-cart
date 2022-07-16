<template>
  <div class="wrapper">
    <h2 id="basic-example-heading">{{ nameProduct }}</h2>

    <Splide
      aria-labelledby="basic-example-heading"
      v-if="enabled"
      :options="options"
      @splide:mounted="onSplideMounted"
      @splide:move="onSplideMove"
    >
      <SplideSlide v-for="(image, index) in images" :key="index">
        <img :src="`data:${image.contentType};base64,${image.data}`" alt="" />
      </SplideSlide>
    </Splide>

    <!-- <button @click="enabled = !enabled">
      {{ enabled ? "Hide Slider" : "Show Slider" }}
    </button> -->
  </div>
</template>

<script>
//import { Splide as Core } from "@splidejs/splide";
import "@splidejs/vue-splide/css";
import { Splide, SplideSlide } from "@splidejs/vue-splide";
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "splide-basic",
  components: {
    Splide,
    SplideSlide,
  },
  props: {
    images: {
      type: Array,
    },
    nameProduct: {
      type: String,
      default: "",
    },
  },
  setup() {
    // const images = ref(props.images);
    const options = {
      rewind: true,
      perPage: 1,
      gap: "1rem",
      height: "40rem",
      breakpoints: {
        1000: {
          perPage: 1,
        },
      },
    };
    const enabled = ref(true);
    const onSplideMounted = (splide) => console.log(splide.length);
    const onSplideMove = (splide, index) => console.log("move to", index);
    return {
      options,
      onSplideMounted,
      onSplideMove,
      enabled,
    };
  },
});
</script>
<style scoped>
#basic-example-heading {
  text-align: center;
}
</style>
