import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Header from ".";

test("Refresh button calls onRefresh", async () => {
  const onRefresh = jest.fn();

  render(<Header onRefresh={onRefresh} />);
  fireEvent.click(screen.getByText("refresh"));
  expect(onRefresh).toHaveBeenCalledTimes(1);
});
