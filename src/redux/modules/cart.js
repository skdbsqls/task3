// createSlice를 import 해주기
import { createSlice } from "@reduxjs/toolkit";

// useState의 초기값을 initialState로 만들어주기
const initialState = [];

// createSlice 만들기
const cart = createSlice({
  name: "cart",
  initialState,
  // reducers 안에 변경 함수를 만들어서 데이터 변경하기
  reducers: {
    addToCart: (state, action) => {
      // 여기서 action.payload는 dispatch가 전달해준 addProduct
      // 같은 상품이면서 같은 옵션이면 장바구니에 담기지 않게 하기!!!!
      if (
        state.find((item) => item.name === action.payload.name) &&
        state.find((item) => item.option === action.payload.option)
      ) {
        return alert("동일한 상품이 장바구니에 담겨져 있습니당!");
      }
      state.push(action.payload);
    },
    // 개수 더하기
    plusNumber: (state, action) => {
      // 여기서 action.payload는 dispatch가 전달해준 product의 id
      // 선택한 상품을 먼저 찾아주고 상품의 개수와 총 금액을 변경해준다
      const product = state.find((item) => item.id === action.payload);
      product.number = product.number + 1;
      product.totalPrice = product.price * product.number;
    },
    // 개수 빼기
    minusNumber: (state, action) => {
      // 여기서 action.payload는 dispatch가 전달해준 product의 id
      // 선택한 상품을 먼저 찾아주고 상품의 개수와 총 금액을 변경해준다
      const product = state.find((item) => item.id === action.payload);
      // 개수가 1보다 작아지지 않게 만들기
      if (1 < product.number) {
        product.number = product.number - 1;
      }
      product.totalPrice = product.price * product.number;
    },
    // 장바구니 상품 삭제하기
    deleteItem: (state, action) => {
      return state.filter((item) => item.id !== action.payload);
    },
  },
});

// 만들어준 변경 함수 구조분해할당으로 export 해주기
export const { addToCart, plusNumber, minusNumber, deleteItem } = cart.actions;

// configureStore에 등록하기 위해 reducer를 export 해주기
export default cart.reducer;
