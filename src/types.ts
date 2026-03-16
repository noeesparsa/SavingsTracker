type Account = {
  id: string;
  label: string;
};

type AccountSnapshotPayload = Record<string, number>;

export type { Account, AccountSnapshotPayload };
