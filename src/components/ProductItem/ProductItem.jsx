import React from "react";

const ProductItem = ({ id, productName, trackPressEvent }) => {
  return (
    <div
      role="textbox"
      className="product-item"
      onClick={() => trackPressEvent(id, productName)}
    >
      {productName}
    </div>
  );
};

export default ProductItem;
