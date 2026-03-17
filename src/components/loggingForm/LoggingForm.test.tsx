import { fireEvent, screen, waitFor } from "@testing-library/react";

import { customRender } from "../../test-utils";

import LoggingForm from "./LoggingForm.component";

const mockLogin = vi.fn();

vi.mock("../../context/authentication/useAuthentication", () => ({
  useAuthentication: () => ({
    login: mockLogin,
    loading: false,
  }),
}));

describe("LoggingForm", () => {
  it("should render all inputs", () => {
    customRender(<LoggingForm />);
    expect(screen.getByPlaceholderText("Email")).toBeVisible();
    expect(screen.getByPlaceholderText("Password")).toBeVisible();
  });

  it("should call login method on form submission", async () => {
    customRender(<LoggingForm />);

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /log in/i }));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith("test@example.com", "password123");
    });
  });
});
