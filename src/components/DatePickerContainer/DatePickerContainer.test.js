import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DatePickerContainer from "./DatePickerContainer";

test("datepicker test", () => {
  render(<DatePickerContainer />);
  const input = screen.getByRole("input");
  userEvent.click(input);
  userEvent.click(screen.getByTitle("2020-06-30"));
  expect(input.value).toBe("2020-06-30");
});
