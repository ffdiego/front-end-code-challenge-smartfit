import React from "react";
import { render } from "@testing-library/react";

import Home from "pages/index";

describe("Main page structure", () => {
  it("Should render correctly", () => {
    const { container } = render(<Home />);
    expect(container).toMatchSnapshot();
  });
});
