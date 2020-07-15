import React, { Fragment } from "react";
import { render, screen } from "@testing-library/react";
import FragmentSupportingSwitch from "./FragmentSupportingSwitch";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

describe("产品组件测试", () => {
  test("正确渲染产品名称", () => {
    const TestComponent = () => {
      return (
        <div>
          <Fragment>
            <span>this is test text1</span>
            <Fragment>
              <p>this is test text2</p>
              <p></p>
            </Fragment>
            <span></span>
          </Fragment>
        </div>
      );
    };

    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <FragmentSupportingSwitch>
          <TestComponent />
        </FragmentSupportingSwitch>
      </Router>
    );

    expect(screen.getByText("this is test text1")).toBeInTheDocument();
    expect(screen.getByText("this is test text2")).toBeInTheDocument();
  });
});
