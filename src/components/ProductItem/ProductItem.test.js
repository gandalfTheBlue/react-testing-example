import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProductItem from "./ProductItem";

describe("产品组件测试", () => {
  test("正确渲染产品名称", () => {
    render(<ProductItem productName="product 1" />);
    expect(screen.getByText("product 1")).toBeInTheDocument();
  });

  test("当用户点击产品名称的时候，埋点方法正确触发", () => {
    const trackPressEvent = jest.fn();
    render(
      <ProductItem
        id={1}
        productName="product 1"
        trackPressEvent={trackPressEvent}
      />
    );
    userEvent.click(screen.getByRole("textbox"));
    expect(trackPressEvent).toHaveBeenCalledTimes(1);
    expect(trackPressEvent).toHaveBeenCalledWith(1, "product 1");
  });
});
