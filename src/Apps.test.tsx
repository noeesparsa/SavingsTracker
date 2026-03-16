import { screen } from "@testing-library/react";
import { vi } from "vitest";

import App from "./App";
import { renderWithQueryClient } from "./test-utils";

vi.mock("./components/accountForm/AccountForm.component", () => ({
  default: () => <div>Account form</div>,
}));

describe("App", () => {
  it("should", () => {
    renderWithQueryClient(<App />);
    expect(screen.getByText("Savings Tracker")).toBeVisible();
    expect(screen.getByText("Account form")).toBeVisible();
  });
});
