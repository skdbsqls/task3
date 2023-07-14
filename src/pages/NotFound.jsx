import React from "react";
import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <>
      <h1>없는 페이지입니다!</h1>
      <Link to="/">홈으로 이동</Link>
    </>
  );
};
