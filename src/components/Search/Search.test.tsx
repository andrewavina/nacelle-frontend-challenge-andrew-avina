import { render, fireEvent, screen } from "@testing-library/react";
import Search from "./Search";

describe("Search component unit tests:", () => {
  test("input handling and displaying results:", () => {
    const { getByPlaceholderText, getByText } = render(
      <Search onSearch={jest.fn()} placeholder="Search..." />,
    );

    const input = getByPlaceholderText("Search...");
    fireEvent.change(input, { target: { value: "React" } });
    expect(getByText("Loading...")).toBeInTheDocument();
  });

  test("clear button clears input and results", () => {
    const { getByPlaceholderText, getByText } = render(
      <Search onSearch={jest.fn()} placeholder="Search..." />,
    );

    const input = getByPlaceholderText("Search...");
    fireEvent.change(input, { target: { value: "React" } });
    fireEvent.click(getByText("Clear"));
    expect(input).toHaveValue("");
  });

  test("displays no results message", async () => {
    const { getByPlaceholderText, findByText } = render(
      <Search onSearch={jest.fn()} placeholder="Search..." />,
    );

    fireEvent.change(getByPlaceholderText("Search..."), {
      target: { value: "Unknown" },
    });
    expect(await findByText("No results found.")).toBeInTheDocument();
  });
});

describe("Search component snapshot tests:", () => {
  test("matches snapshot for initial render", () => {
    const { asFragment } = render(
      <Search onSearch={() => {}} placeholder="Search for tutorials..." />,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
