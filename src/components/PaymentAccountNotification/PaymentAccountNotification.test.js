import React from "react";
import { render, screen } from "@testing-library/react";
import PaymentAccountNotification from "./PaymentAccountNotification";

describe("<PaymentAccountNotification/>", () => {
  test("test the correct message is rendered", () => {
    render(<PaymentAccountNotification messagekey="" />);
    expect(screen.getByRole("textbox")).toBeEmptyDOMElement();
  });
});
