import { screen } from "@testing-library/react";
import { Form } from "antd";

import { customRender } from "../../test-utils";

import FormInput from "./FormInput.component";

describe("FormInput", () => {
  it("should render the label and euro input", () => {
    customRender(
      <Form layout="vertical">
        <FormInput id="savings" label="Savings" />
      </Form>
    );

    expect(screen.getByText("Savings")).toBeVisible();
    expect(screen.getByRole("spinbutton")).toBeVisible();
    expect(screen.getByText("€")).toBeVisible();
  });
});
