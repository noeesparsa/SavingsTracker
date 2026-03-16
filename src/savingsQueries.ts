import { useMutation, useQuery } from "@tanstack/react-query";

import { apiUrlByUser } from "./api";
import type { Account, AccountSnapshotPayload } from "./types";

const useGetSavingsAccounts = (username: string) => {
  return useQuery<Account[]>({
    queryKey: [username, "accounts"],
    staleTime: 24 * 60 * 60 * 1000, // 24 hours
    queryFn: async () => {
      const response = await fetch(apiUrlByUser[username]);

      return response.json();
    },
  });
};
const useUploadSavingsSnapshot = (username: string) => {
  return useMutation({
    mutationFn: async (savings: AccountSnapshotPayload) => {
      const response = await fetch(apiUrlByUser[username], {
        method: "POST",
        mode: "no-cors", // Nécessaire pour Google Apps Script
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(savings),
      });

      return response.json();
    },
  });
};

export { useGetSavingsAccounts, useUploadSavingsSnapshot };
