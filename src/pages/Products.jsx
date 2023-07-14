import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { reset, sortByPrice } from "../redux/modules/products";

export default function Products() {
  // useSelector로 store에서 데이터 가져오기
  const products = useSelector((state) => state.products);
  // useDispatch
  const dispatch = useDispatch();
  return (
    <>
      <div
        style={{
          marginTop: "56px",
          textAlign: "center",
        }}
      >
        <h2>🔥 여름 추천템 🔥</h2>
        <button
          onClick={() => {
            dispatch(sortByPrice());
          }}
        >
          가격순
        </button>
        <button
          onClick={() => {
            dispatch(reset());
          }}
        >
          리셋
        </button>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "24px",
          }}
        >
          {products.map((product) => (
            <Link to={`/products/${product.id}`} key={product.id}>
              <div
                style={{
                  width: "200px",
                  height: "240px",
                  backgroundColor: "#068FFF",
                  color: "#fff",
                }}
              >
                <div>{product.name}</div>
                <div>가격: {product.price}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
