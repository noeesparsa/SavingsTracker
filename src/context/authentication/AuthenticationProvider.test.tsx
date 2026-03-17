import { fireEvent, screen, waitFor } from "@testing-library/react";
import type { User } from "firebase/auth";
import { act, useContext } from "react";
import { vi } from "vitest";

import { customRender } from "../../test-utils";

import { AuthenticationContext } from "./AuthenticationContext";
import { AuthenticationProvider } from "./AuthenticationProvider";

const {
  authMock,
  messageErrorMock,
  onAuthStateChangedMock,
  signInWithEmailAndPasswordMock,
  signOutMock,
  unsubscribeMock,
} = vi.hoisted(() => ({
  authMock: { name: "firebase-auth-instance" },
  messageErrorMock: vi.fn(),
  onAuthStateChangedMock: vi.fn(),
  signInWithEmailAndPasswordMock: vi.fn(),
  signOutMock: vi.fn(),
  unsubscribeMock: vi.fn(),
}));

vi.mock("../../firebase", () => ({
  auth: authMock,
}));

vi.mock("firebase/auth", () => ({
  onAuthStateChanged: onAuthStateChangedMock,
  signInWithEmailAndPassword: signInWithEmailAndPasswordMock,
  signOut: signOutMock,
}));

let authStateChangedListener: ((currentUser: User | null) => void) | undefined;

const AuthenticationConsumer = () => {
  const { loading, login, logout, user } = useContext(AuthenticationContext);

  return (
    <>
      <span data-testid="loading">{String(loading)}</span>
      <span data-testid="user-email">{user?.email ?? "none"}</span>
      <button
        onClick={() => void login("user@example.com", "secret")}
        type="button"
      >
        login
      </button>
      <button onClick={() => void logout()} type="button">
        logout
      </button>
    </>
  );
};

describe("AuthenticationProvider", () => {
  beforeEach(() => {
    authStateChangedListener = undefined;

    messageErrorMock.mockReset();
    onAuthStateChangedMock.mockReset();
    signInWithEmailAndPasswordMock.mockReset();
    signOutMock.mockReset();
    unsubscribeMock.mockReset();

    onAuthStateChangedMock.mockImplementation(
      (_auth: object, callback: (currentUser: User | null) => void) => {
        authStateChangedListener = callback;
        return unsubscribeMock;
      }
    );
    signInWithEmailAndPasswordMock.mockResolvedValue({});
    signOutMock.mockResolvedValue(undefined);
  });

  it("should subscribe to the auth state and expose the resolved user", () => {
    customRender(
      <AuthenticationProvider>
        <AuthenticationConsumer />
      </AuthenticationProvider>
    );

    expect(onAuthStateChangedMock).toHaveBeenCalledWith(
      authMock,
      expect.any(Function)
    );
    expect(screen.getByTestId("loading")).toHaveTextContent("true");
    expect(screen.getByTestId("user-email")).toHaveTextContent("none");

    const authenticatedUser: Partial<User> = {
      email: "user@example.com",
      uid: "user-1",
    };

    act(() => {
      authStateChangedListener?.(authenticatedUser as User);
    });

    expect(screen.getByTestId("loading")).toHaveTextContent("false");
    expect(screen.getByTestId("user-email")).toHaveTextContent(
      "user@example.com"
    );
  });

  it("should login with firebase auth credentials", () => {
    customRender(
      <AuthenticationProvider>
        <AuthenticationConsumer />
      </AuthenticationProvider>
    );

    fireEvent.click(screen.getByRole("button", { name: "login" }));

    expect(signInWithEmailAndPasswordMock).toHaveBeenCalledWith(
      authMock,
      "user@example.com",
      "secret"
    );
  });

  it("should surface a message when login fails", async () => {
    signInWithEmailAndPasswordMock.mockRejectedValueOnce(
      new Error("invalid credentials")
    );

    customRender(
      <AuthenticationProvider>
        <AuthenticationConsumer />
      </AuthenticationProvider>
    );

    fireEvent.click(screen.getByRole("button", { name: "login" }));

    await waitFor(() => {
      expect(screen.getByText("Wrong email or password")).toBeVisible();
    });
  });

  it("should logout and unsubscribe on unmount", () => {
    const { unmount } = customRender(
      <AuthenticationProvider>
        <AuthenticationConsumer />
      </AuthenticationProvider>
    );

    fireEvent.click(screen.getByRole("button", { name: "logout" }));

    expect(signOutMock).toHaveBeenCalledWith(authMock);

    unmount();

    expect(unsubscribeMock).toHaveBeenCalledOnce();
  });
});
