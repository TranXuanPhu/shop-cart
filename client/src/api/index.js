const url = {
  products: "/products",

  //count
  account: "/account",
  register: "/account/register",
  login: "/account/login",
  refreshtoken: "/account/refreshtoken",
};

//NOTE: set url
for (let v in url) {
  url[v] = `${process.env.VUE_APP_BASE_URL}` + url[v];
  console.log(url[v]);
}

export default url;
