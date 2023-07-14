// createSlice를 import 해주기
import { createSlice } from "@reduxjs/toolkit";

// useState의 초기값을 initialState로 만들어주기
const initialState = [
  {
    id: 1,
    name: "멋진 바지",
    price: 20000,
    number: 1,
    totalPrice: 20000,
    options: ["28", "30", "32"],
    likes: 100,
  },
  {
    id: 2,
    name: "멋진 셔츠",
    price: 10000,
    number: 1,
    totalPrice: 10000,
    options: ["small", "medium", "large"],
    likes: 200,
  },
  {
    id: 3,
    name: "멋진 신발",
    price: 30000,
    number: 1,
    totalPrice: 30000,
    options: ["230", "240", "250", "260", "270"],
    likes: 300,
  },
];

// createSlice 만들기
const products = createSlice({
  name: "products",
  initialState,
  // reducers 안에 변경 함수를 만들어서 데이터 변경하기
  reducers: {
    sortByPrice: (state) => {
      state.sort((a, b) => a.price - b.price);
    },
    reset: () => {
      return initialState;
    },
  },
});

// 만들어준 변경 함수 구조분해할당으로 export 해주기
export const { sortByPrice, reset } = products.actions;

// configureStore에 등록하기 위해 reducer를 export 해주기
export default products.reducer;
