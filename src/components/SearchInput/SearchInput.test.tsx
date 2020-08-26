import React from "react";
import { cleanup, render, fireEvent } from "@testing-library/react";
import SearchInput from "./SearchInput";

afterEach(cleanup);

const inputPlaceholder = "Enter username";

test("no inital value", async () => {
  const view = render(<SearchInput />);

  const input = view.getByPlaceholderText(inputPlaceholder) as HTMLInputElement;
  expect(input.value).toBe("");
});

test("with inital value", async () => {
  const view = render(<SearchInput value="test" onChange={() => {}} />);

  const input = view.getByPlaceholderText(inputPlaceholder) as HTMLInputElement;

  expect(input.value).toBe("test");
});

test("submit callback called when value changed", async () => {
  const onChange = jest.fn();
  const view = render(<SearchInput value="value" onChange={onChange} />);

  const input = view.getByPlaceholderText(inputPlaceholder) as HTMLInputElement;
  fireEvent.change(input, { target: { value: "new-value" } });

  expect(onChange).toHaveBeenCalled();
});

test("submit callback has been called when button clicked", async () => {
  const onSubmit = jest.fn();
  const view = render(<SearchInput onSubmit={onSubmit} />);

  const button = view.getByTestId("search-submit");

  fireEvent.click(button);

  expect(onSubmit).toHaveBeenCalled();
});

test("submit callback has been called when enter was clicked", async () => {
  const onSubmit = jest.fn();
  const view = render(
    <SearchInput onSubmit={onSubmit} value="value" onChange={() => {}} />
  );

  const input = view.getByPlaceholderText(inputPlaceholder) as HTMLInputElement;

  fireEvent.focus(input);
  fireEvent.submit(input);

  expect(onSubmit).toHaveBeenCalled();
});
