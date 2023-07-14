import React, { useState } from "react";
import { nanoid } from "nanoid";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  addToCart,
  minusNumber,
  plusNumber,
  deleteItem,
} from "../redux/modules/cart";

export default function Product() {
  // useSelector로 store에서 데이터 가져오기
  const cart = useSelector((state) => state.cart);
  const products = useSelector((state) => state.products);

  // 상세페이지에 알맞는 상품 찾기
  const { id } = useParams();
  const product = products.find((product) => product.id === Number(id));

  // useDispatch
  const dispatch = useDispatch();

  // 개수 플러스 마이너스
  const [number, setNumber] = useState(1);
  // 옵션 선택하기
  const [option, setOption] = useState("");
  const handleOption = (event) => {
    setOption(event.target.value);
  };

  return (
    <>
      <div>
        <h1>상세 페이지</h1>
        <div
          style={{
            display: "flex",
            gap: "44px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "200px",
              height: "240px",
              backgroundColor: "#068FFF",
            }}
          >
            {product.name}
          </div>
          <div>
            <h3>가격: {product.price}</h3>
            <h3>좋아요: {product.likes}</h3>
            <h3>구매옵션</h3>
            <select
              style={{
                width: "100px",
              }}
              value={option}
              onChange={handleOption}
            >
              <option value={""}>선택하세요.</option>
              {product.options.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
            <div>구매옵션 : {option}</div>
            {/* 옵션을 선택하면 개수와 총 금액이 보이게 하기 */}
            {option && (
              <div>
                <span>개수 : {number}</span>
                <button
                  onClick={() => {
                    if (1 < number) {
                      setNumber(number - 1);
                    }
                  }}
                >
                  -
                </button>
                <button
                  onClick={() => {
                    setNumber(number + 1);
                  }}
                >
                  +
                </button>
                <div>총 금액 : {product.price * number}</div>
              </div>
            )}
            <button
              onClick={() => {
                // 옵션을 선택하지 않고 장바구니에 담으려고 하면 alert 띄우기
                if (option === "") {
                  return alert("옵션을 선택하세용!");
                }
                // dispatch로 추가하고자 하는 product를 payload로 담아서 전달하기
                const addProduct = {
                  ...product,
                  id: nanoid(),
                  option,
                  number,
                  totalPrice: product.price * number,
                };
                dispatch(addToCart(addProduct));
              }}
            >
              장바구니 담기
            </button>
          </div>
        </div>
        <h1>장바구니</h1>
        <div>
          {cart.map((item) => {
            return (
              <div
                key={item.id}
                style={{
                  border: "1px solid black",
                  margin: "10px",
                  padding: "10px",
                }}
              >
                <h3>상품명: {item.name}</h3>
                <h3>가격: {item.price}</h3>
                <h3>옵션: {item.option}</h3>
                <h3 style={{ display: "inline-block" }}>개수: </h3>
                <button
                  onClick={() => {
                    dispatch(minusNumber(item.id));
                  }}
                >
                  -
                </button>
                <h3 style={{ display: "inline-block" }}>{item.number}</h3>
                <button
                  onClick={() => {
                    dispatch(plusNumber(item.id));
                  }}
                >
                  +
                </button>
                <h3>총 금액: {item.totalPrice}</h3>
                <button
                  onClick={() => {
                    alert("진짜 삭제할거얌?");
                    dispatch(deleteItem(item.id));
                  }}
                >
                  장바구니에서 삭제
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
