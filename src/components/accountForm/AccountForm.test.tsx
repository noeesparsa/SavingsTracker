import { fireEvent, screen } from "@testing-library/react";
import { act } from "react";
import { vi } from "vitest";

import { customRender } from "../../test-utils";

import AccountForm from "./AccountForm.component";

const { useGetSavingsAccountsMock, useUploadSavingsSnapshotMock } = vi.hoisted(
  () => ({
    useGetSavingsAccountsMock: vi.fn(),
    useUploadSavingsSnapshotMock: vi.fn(),
  })
);

vi.mock("../../savingsQueries", () => ({
  useGetSavingsAccounts: useGetSavingsAccountsMock,
  useUploadSavingsSnapshot: useUploadSavingsSnapshotMock,
}));

describe("AccountForm", () => {
  const uploadMutationMock = vi.fn();

  beforeEach(() => {
    useGetSavingsAccountsMock.mockReturnValue({
      data: [{ id: "livret-a", label: "Livret A" }],
      isLoading: false,
      isError: false,
    });
    useUploadSavingsSnapshotMock.mockReturnValue({
      mutate: uploadMutationMock,
      isPending: false,
    });
  });

  it("should render the fetched accounts and submit action", () => {
    customRender(<AccountForm userEmail="noe.esp@hotmail.fr" />);

    expect(screen.getByText("Livret A")).toBeVisible();
    expect(
      screen.getByRole("button", { name: /Upload snapshot/ })
    ).toBeEnabled();
  });

  it("should upload savings on form submission", async () => {
    customRender(<AccountForm userEmail="noe.esp@hotmail.fr" />);
    const uploadButton = screen.getByRole("button", {
      name: /Upload snapshot/,
    });

    const formInput = screen.getByLabelText("Livret A");

    await act(async () => {
      fireEvent.change(formInput, { target: { value: 23 } });
    });

    await act(async () => {
      uploadButton.click();
    });

    expect(uploadMutationMock).toHaveBeenCalledOnce();
  });
});
