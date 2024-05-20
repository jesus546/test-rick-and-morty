import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import FilterContent, {
  InOptions,
} from "../components/layout/filter/filterContent";

describe("Loading Component", () => {
  const mockOnClickFilter = jest.fn();
  
  const mockOptions: InOptions[] = [
    { label: "Option 1", value: "option1" },
    { label: "Option 2", value: "option2" },
  ];

  test("FilterContent renders correctly", () => {
    render(
      <FilterContent
        title="Filter Title"
        value="option1"
        options={mockOptions}
        onClickFilter={mockOnClickFilter}
      />
    );

    expect(screen.getByText("Filter Title")).toBeInTheDocument();

    mockOptions.forEach((option) => {
      expect(screen.getByText(option.label)).toBeInTheDocument();
    });
  });

  test("FilterContent handles button clicks", () => {
    render(
      <FilterContent
        title="Filter Title"
        value="option1"
        options={mockOptions}
        onClickFilter={mockOnClickFilter}
      />
    );

    fireEvent.click(screen.getByText("Option 2"));

    expect(mockOnClickFilter).toHaveBeenCalledWith(
      { label: "Option 2", value: "option2" },
      "filter title"
    );
  });
});
