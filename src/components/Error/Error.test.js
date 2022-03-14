import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, getByText } from "@testing-library/react";
import Error from ".";

test("Error renders correctly with provided reason", () => {
  const { container } = render(<Error reason="Something went wrong" />);
  const node = getByText(container, "Something went wrong");
  expect(node).toBeInTheDocument();
  expect(container.firstChild).toHaveClass("error_container");
});

test("Error renders with default reason", () => {
  const { container } = render(<Error />);
  const node = getByText(container, "not connected to the interwebs.");
  expect(node).toBeInTheDocument();
});
