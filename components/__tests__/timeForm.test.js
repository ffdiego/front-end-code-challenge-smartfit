import TimeForm from "components/TimeForm";

import { render } from "@testing-library/react";
import UserEvent from "@testing-library/user-event";

describe("Time Form tests", () => {
  it("should render correctly", () => {
    const { container } = render(<TimeForm results={[]} />);
    expect(container).toMatchSnapshot();
  });

  it("should not call search function when there is no input", () => {
    const search = jest.fn();
    const { getByText } = render(<TimeForm search={search} results={[]} />);
    const button = getByText("ENCONTRAR UNIDADE");
    UserEvent.click(button);
    expect(search).not.toHaveBeenCalled();
  });

  it("should call search function when there is input", () => {
    const search = jest.fn();
    const { getByText } = render(<TimeForm search={search} results={[]} />);
    const radio = getByText("Noite");
    const button = getByText("ENCONTRAR UNIDADE");

    UserEvent.click(radio);
    UserEvent.click(button);

    expect(search).toHaveBeenCalled();
  });
});
