import { screen } from "@testing-library/react";

import App from "./App";
import { customRender } from "./test-utils";

describe("App", () => {
  it("should", () => {
    customRender(<App />);
    expect(screen.getByText("Savings Tracker")).toBeVisible();
  });
});
