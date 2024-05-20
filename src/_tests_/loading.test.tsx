import React from "react";
import { render, screen  } from "@testing-library/react";

import Loading from "../components/loading/index";

describe('Loading Component', () => {
  test('renders correctly', () => {
    render(<Loading />);
    
    const imgElement = screen.getByAltText(/rick loading/i);
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute('src', '/video/rick-loading.gif');
  });

  test('image has correct class names', () => {
    render(<Loading />);
    
    const imgElement = screen.getByAltText(/rick loading/i);
    expect(imgElement).toHaveClass('rounded-full h-40 w-40 absolute top-0 bottom-0 left-0 right-0 m-auto');
  });
});