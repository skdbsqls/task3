import { configureStore } from "@reduxjs/toolkit";
// products와 cart import 해주기
import products from "../modules/products";
import cart from "../modules/cart";

const store = configureStore({
  // configureStore에 등록하기
  reducer: {
    products,
    cart,
  },
});

export default store;
