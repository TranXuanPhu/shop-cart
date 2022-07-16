<template>
  <div id="app" class="container">
    <main>
      <nav class="navbar navbar-expand-lg navbar-light bg-light" id="nav">
        <img alt="Vue logo" src="./assets/logo.png" class="navbar__logo" />
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarText">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <router-link to="/" class="nav-link">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/products" class="nav-link"
                >All Products</router-link
              >
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Pricing</a>
            </li>
            <li class="nav-item">
              <router-link to="/about" class="nav-link">About</router-link>
            </li>
          </ul>
        </div>
        <div class="navbar-nav ml-auto">
          <div class="nav-item" style="position: relative">
            <router-link to="/cart" class="nav-link">
              <i class="fa-solid fa-cart-shopping fa-xl"></i>
              <span
                class="ml-1"
                style="position: absolute; top: 0; color: red"
                >{{ totalCartProducts }}</span
              >
            </router-link>
          </div>
        </div>
      </nav>
      <router-view />
    </main>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";
export default {
  name: "App",
  setup() {
    const store = useStore();
    const totalCartProducts = computed(
      () => store.getters["cart/getTotalCountProducts"]
    );
    function getLocalProducts() {
      const items = JSON.parse(localStorage.getItem("cart"));
      if (items) store.dispatch("cart/setCartProducts", items);
    }

    getLocalProducts();

    return { totalCartProducts };
  },
};
</script>

<style lang="css">
@import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 15px;
}

#nav > a {
  font-weight: bold;
  color: #2c3e50;
  /* &.router-link-exact-active {
    color: #42b983;
  } */
}

html {
  position: relative;
  min-height: 100%;
}
body {
  margin-bottom: 60px; /* Margin bottom by footer height */
}
.navbar__logo {
  width: 50px;
  height: 50px;
}
.footer {
  position: relative;
  bottom: 0;
  width: 100%;
  height: 60px; /* Set the fixed height of the footer here */
  background-color: #f5f5f5;
}

footer {
  background-color: #f2f2f2;
  padding: 25px;
}

.footer p,
.footer div {
  display: inline;
  vertical-align: top;
  font-family: "Open Sans", sans-serif;
  font-size: 16px;
  line-height: 28px;
}
.footer p {
  font-weight: bold;
}

* a {
  color: #42b983;
}

* .fa {
  font-size: 18px;
}

.buttonGreen-outline {
  width: 100%;
  color: #41b883;
  background-color: transparent;
  border-color: #41b883;
}
.buttonGreen-outline:hover {
  color: #ffffff;
  background-color: #41b883;
  border-color: #41b883;
}

.buttonGreen {
  color: #fff;
  background-color: #41b883;
}

.buttonGreen:hover {
  background-color: #42a97b;
}
</style>
